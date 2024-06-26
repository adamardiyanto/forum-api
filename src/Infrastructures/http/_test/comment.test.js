const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableHelper');

describe('/threads/{threadId}/comments endpoint', () => {
  let accessToken;
  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  beforeAll(async () => {
    accessToken = await ServerTestHelper.getAccessToken('user-test');
    await ThreadsTableTestHelper.addThread({ owner: 'user-test' });
  });

  describe('when POST /threads/{threadId}/comments', () => {
    it('should response 201 and persisted comment', async () => {
      const payload = { content: 'comment content test' };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-test/comments',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const payload = { content: '' };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-test/comments',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const payload = { content: true };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-test/comments',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat comment baru karena tipe data tidak sesuai');
    });

    it('should response 404 when thread not found', async () => {
      const payload = { content: 'comment content test' };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-54321/comments',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Thread dengan id: thread-54321 tidak ditemukan!.');
    });
  });

  describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
    it('should response 200 and deleted comment', async () => {
      const server = await createServer(container);

      await CommentsTableTestHelper.addComment({
        userId: 'user-test',
        threadId: 'thread-test',
      });

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-test/comments/comment-test',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 403 when comment it is not the owner', async () => {
      const server = await createServer(container);

      const anotherAccessToken = await ServerTestHelper.getAccessToken('user-321', 'qwerty');

      await CommentsTableTestHelper.addComment({
        userId: 'user-test',
        threadId: 'thread-test',
      });

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-test/comments/comment-test',
        headers: {
          Authorization: `Bearer ${anotherAccessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Resource ini tidak boleh diakses!');
    });

    it('should response 404 when thread not found', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-54321/comments/comment-id_test',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Thread dengan id: thread-54321 tidak ditemukan!.');
    });

    it('should response 404 when comment not found', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-test/comments/comment-id_test',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Comment dengan id comment-id_test tidak ditemukan.');
    });
  });
});
