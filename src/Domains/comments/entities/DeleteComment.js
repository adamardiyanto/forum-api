class DeleteComment {
  constructor(owner, payload) {
    this._verifyPayload(payload);
    this._verifyOwner(owner);
    this.id = payload.id;
    this.owner = owner;
    this.threadId = payload.threadId;
  }

  _verifyPayload(payload) {
    const { id, threadId } = payload;
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
