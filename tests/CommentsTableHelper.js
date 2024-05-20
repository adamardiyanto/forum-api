/* istanbul ignore file */

const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableHelper = {
  async addComment({
    userId = 'user-321',
    threadId = 'thread-test',
    commentId = 'comment-test',
    content = 'new comment',
  }) {
    const query = {
      text: 'INSERT INTO comments(owner, thread_id, id, content) VALUES($1, $2, $3, $4) RETURNING id, content, owner',
      values: [userId, threadId, commentId, content],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },

  async findCommentById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = CommentsTableHelper;
