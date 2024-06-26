const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableHelper');
const pool = require('../../database/postgres/pool');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const createServer = require('../createServer');
const container = require('../../container');

describe('thread endpoint ', () => {
  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('POST /Threads', () => {
    it('response 201 and persisted thread', async () => {
      const payload = {
        title: 'new thread test',
        body: 'thread',
      };
      const accessToken = await ServerTestHelper.getAccessToken('user-test');
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
    });
  });
  describe('when GET /threads/{threadId}', () => {
    it('should response 200 and get detail thread', async () => {
      const server = await createServer(container);
      await ThreadsTableTestHelper.addThread({
        id: 'thread-test',
        owner: 'user-test',
      });
      await CommentsTableTestHelper.addComment({
        userId: 'user-test',
        threadId: 'thread-test',
      });

      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-test',
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.thread).toBeDefined();
      expect(responseJson.data.thread.comments).toBeDefined();
    });

    it('should response 404 when thread not found', async () => {
      const server = await createServer(container);
      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-5432',
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Thread dengan id: thread-5432 tidak ditemukan!.');
    });
  });
});
