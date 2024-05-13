const AddedThread = require('../AddedThread');

describe(' an AddedThread entities ', () => {
  it('should throw error when payload not complete ', () => {
    const payload = {
      title: 'new thread',
    };

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload not meet data type specification ', () => {
    const payload = {
      id: 'thread-123',
      title: 'new thread',
      owner: 12345,
    };

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddedThread entities correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'new thread',
      owner: 'user-123',
    };

    const addedThread = new AddedThread(payload);

    expect(addedThread).toBeInstanceOf(AddedThread);
    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.title).toEqual(payload.title);
    expect(addedThread.body).toEqual(payload.body);
    expect(addedThread.date).toEqual(payload.date);
    expect(addedThread.owner).toEqual(payload.owner);
  });
});
