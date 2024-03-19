const Thread = require('../Thread');

describe('Thread entities ', () => {
  it('should throw error when payload doesnt contain needed property ', () => {
    const payload = {
      title: 'new thread',
    };

    expect(() => new Thread(payload).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY'));
  });

  it('should throw error when payload not meet data type specification ', () => {
    const payload = {
      title: 'new thread',
      body: 12345,
      date: '2024-03-17',
      owner: 'user-123',
    };

    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Thread entities correctly', () => {
    const payload = {
      title: 'new thread',
      body: '12345',
      date: '2024-03-17',
      owner: 'user-123',
    };

    const thread = new Thread(payload);

    expect(thread).toBeInstanceOf(Thread);
    expect(thread.title).toEqual(payload.title);
    expect(thread.body).toEqual(payload.body);
    expect(thread.date).toEqual(payload.date);
    expect(thread.owner).toEqual(payload.owner);
  });
});
