class NewComment {
  constructor(owner, payload) {
    this._verifyPayload(payload);
    this._verifyOwner(owner);
    this.content = payload.content;
    this.owner = owner;
    this.threadId = payload.threadId;
  }

  _verifyPayload(payload) {
    const { content, threadId } = payload;
    if (!content || !threadId) {
      throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof content !== 'string' || typeof threadId !== 'string') {
      throw new Error('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _verifyOwner(owner) {
    if (!owner) {
      throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof owner !== 'string') {
      throw new Error('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewComment;
