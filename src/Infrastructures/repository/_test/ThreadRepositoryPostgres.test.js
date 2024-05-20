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

  beforeEach(async () => {
    await UsersTableTestHelper.addUser({
      id: 'user-321', username: 'ndingg', password: 'secret', fullname: 'Dicoding Indonesia',
    });
  });

  describe('addThread function', () => {
    it('should persist new thread and return added thread correctly ', async () => {
      const owner = 'user-321';
      const payload = {
        title: 'new thread',
        body: '12345',
      };
      const newThread = new NewThread(owner, payload);
      const fakeIdGenerator = () => 'test'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      await threadRepositoryPostgres.addThread(newThread);

      const threads = await ThreadsTableTestHelper.findThreadById('thread-test');
      expect(threads).toHaveLength(1);
    });
    it('should return added thread correctly', async () => {
      const owner = 'user-321';
      const payload = {
        title: 'new thread',
        body: '12345',
      };
      const newThread = new NewThread(owner, payload);
      const fakeIdGenerator = () => 'test'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const addThread = await threadRepositoryPostgres.addThread(newThread);
      expect(addThread).toStrictEqual(new AddedThread({
        id: 'thread-test',
        title: 'new thread',
        owner: 'user-321',
      }));
    });
  });
  describe('isThreadExists function', () => {
    it('should return error when not found ', async () => {
      const threadId = 'thread-test';
      const fakeIdGenerator = () => 'test';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await expect(threadRepositoryPostgres.isThreadExists(threadId)).rejects.toThrow(NotFoundError);
    });
    it('should not return error when found', async () => {
      const owner = 'user-321';
      const payload = {
        title: 'new thread',
        body: '12345',
      };
      const newThread = new NewThread(owner, payload);
      const fakeIdGenerator = () => 'test'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      await threadRepositoryPostgres.addThread(newThread);
      await expect(threadRepositoryPostgres.isThreadExists('thread-test')).resolves.not.toThrow(NotFoundError);
    });
  });
  describe('getThreadById function', () => {
    it('should return threa corrctly', async () => {
      await ThreadsTableTestHelper.addThread({
        id: 'thread-test',
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      const threadDetail = await threadRepositoryPostgres.getThreadById('thread-test');
      expect(threadDetail.id).toEqual('thread-test');
      expect(threadDetail.title).toEqual('new thread');
      expect(threadDetail.body).toEqual('12345');
      expect(threadDetail.date).toBeTruthy();
      expect(threadDetail.username).toEqual('ndingg');
    });
  });
});
