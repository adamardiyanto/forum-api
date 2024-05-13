class DeleteComment {
  constructor(owner, payload) {
    this._verifyOwner(owner);
    this._verifyPayload(payload);
    const { id, threadId } = payload;
    this.id = id;
    this.owner = owner;
    this.threadId = threadId;
  }

  _verifyPayload({ id, threadId }) {
    if (!id || !threadId) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id !== 'string' || typeof threadId !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _verifyOwner(owner) {
    if (!owner) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof owner !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteComment;
