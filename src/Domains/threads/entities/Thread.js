class Thread {
  constructor(payload) {
    this._verifyPayload(payload);

    this.title = payload.title;
    this.body = payload.body;
    this.date = payload.date;
    this.owner = payload.owner;
  }

  _verifyPayload(payload) {
    const {
      title, body, date, owner,
    } = payload;

    if (!title || !body || !date || !owner) {
      throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string' || typeof date !== 'string' || typeof owner !== 'string') {
      throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Thread;
