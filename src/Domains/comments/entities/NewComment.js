class NewComment {
  constructor(owner, threadId, content) {
    this._verifyPayload(content);
    this._verifyOwner(owner);
    this._verifyThreadId(threadId);
    this.content = content;
    this.owner = owner;
    this.threadId = threadId;
  }

  _verifyPayload(content) {
    if (!content) {
      throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof content !== 'string') {
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

  _verifyThreadId(threadId) {
    if (!threadId) {
      throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof threadId !== 'string') {
      throw new Error('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewComment;
