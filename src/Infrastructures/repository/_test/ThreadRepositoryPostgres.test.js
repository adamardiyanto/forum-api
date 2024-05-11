const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableHelper');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepositoryPostgres ', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist new thread and return added thread correctly ', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      const owner = 'user-321';
      const payload = {
        title: 'new thread',
        body: '12345',
      };
      const newThread = new NewThread(owner, payload);
      const fakeIdGenerator = () => '123'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      await threadRepositoryPostgres.addThread(newThread);

      const threads = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(threads).toHaveLength(1);
    });
    it('should return added thread correctly', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      const owner = 'user-321';
      const payload = {
        title: 'new thread',
        body: '12345',
      };
      const newThread = new NewThread(owner, payload);
      const fakeIdGenerator = () => '123'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const addThread = await threadRepositoryPostgres.addThread(newThread);
      expect(addThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'new thread',
        owner: 'user-321',
      }));
    });
  });
  describe('isTread exist function', () => {
    it('should error when not found ', async () => {
      const threadId = 'thread-123';
      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await expect(threadRepositoryPostgres.isThreadExists(threadId)).rejects.toThrow(NotFoundError);
    });
    it('should not error when found', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      const owner = 'user-321';
      const payload = {
        title: 'new thread',
        body: '12345',
      };
      const newThread = new NewThread(owner, payload);
      const fakeIdGenerator = () => '123'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      await threadRepositoryPostgres.addThread(newThread);
      await expect(threadRepositoryPostgres.isThreadExists('thread-123')).resolves.not.toThrow(NotFoundError);
    });
  });
  describe('getThread', () => {
    it('should return threa corrctly', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      await CommentsTableTestHelper.addComment({
        userId: 'user-321',
        threadId: 'thread-123',
        commentId: 'comment-123',
        content: 'new comment',
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      const threadDetail = await threadRepositoryPostgres.getThreadById('thread-123');
      expect(threadDetail.id).toEqual('thread-123');
      expect(threadDetail.title).toEqual('new thread');
      expect(threadDetail.body).toEqual('12345');
      expect(threadDetail.date).toBeTruthy();
      expect(threadDetail.username).toEqual('dicoding');
      expect(threadDetail.comments).toHaveLength(1);
    });
  });
});
