const AddedThread = require('../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const Thread = require('../../Domains/threads/entities/Thread');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(newThread) {
    const {
      title, body, owner,
    } = newThread;
    const date = new Date().toISOString();
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, date],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async getThreadById(threadId) {
    const threadQuery = {
      text: 'SELECT threads.id AS id, threads.title AS title, threads.body AS body, threads.date AS date, users.username AS username FROM threads INNER JOIN users ON threads.owner = users.id WHERE threads.id = $1',
      values: [threadId],
    };
    const threadResult = await this._pool.query(threadQuery);
    const threadDetail = threadResult.rows[0];

    return threadDetail;
  }

  async isThreadExists(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError(`Thread dengan id: ${threadId} tidak ditemukan!.`);
    }
  }
}

module.exports = ThreadRepositoryPostgres;
