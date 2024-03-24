class NewThread {
  constructor(owner, payload) {
    this._verifyPayload(payload);
    this._verifyOwner(owner);
    const {
      title, body,
    } = payload;
    this.title = title;
    this.body = body;
    this.owner = owner;
  }

  _verifyPayload({ title, body }) {
    if (!title || !body) {
      throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _verifyOwner(owner) {
    if (!owner) {
      throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof owner !== 'string') {
      throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewThread;
