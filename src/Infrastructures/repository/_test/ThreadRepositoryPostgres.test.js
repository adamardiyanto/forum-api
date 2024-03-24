const ThreadTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

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
      const newThread = new NewThread({
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      const fakeIdGenerator = () => '123'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      await threadRepositoryPostgres.addThread(newThread);

      const threads = await ThreadTableTestHelper.findThreadById('thread-123');
      expect(threads).toHaveLength(1);
    });
  });
});
