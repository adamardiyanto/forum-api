class Comment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.username = payload.username;
    this.content = payload.content;
    this.date = payload.date;
    this.isDelete = payload.isDelete;
  }

  _verifyPayload(payload) {
    const {
      id, username, content, date, isDelete,
    } = payload;

    if (!id || !content || !date || !username || !isDelete) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof date !== 'string' || typeof username !== 'string' || typeof isDelete !== 'boolean') {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Comment;
