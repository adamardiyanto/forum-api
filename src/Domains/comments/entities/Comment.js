class Comment {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      id, content, username, date, isDelete,
    } = payload;
    this.id = id;
    this.username = username;
    this.content = content;
    this.date = date;
    this.isDelete = isDelete;
  }

  _verifyPayload({
    id, content, username, date,
  }) {
    if (!id || !content || !date || !username) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof date !== 'string' || typeof username !== 'string') {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Comment;
