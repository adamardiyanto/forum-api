const NewThread = require('../NewThread');

describe('a NewThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
    };
    const owner = 'user-123';
    // Action and Assert
    expect(() => new NewThread(owner, payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
      body: 123,
    };
    const owner = 'user-123';
    // Action and Assert
    expect(() => new NewThread(owner, payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should throw error when owner did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
      body: 'body thread',
    };
    const owner = null;
    // Action and Assert
    expect(() => new NewThread(owner, payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when owner did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
      body: 'body thread',
    };
    const owner = 1223;
    // Action and Assert
    expect(() => new NewThread(owner, payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newthread object correctly', () => {
    const payload = {
      title: 'new thread',
      body: 'body thread',
    };
    const expectedUserId = 'user-123';
    const { owner, title, body } = new NewThread(expectedUserId, payload);

    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(expectedUserId);
  });
});
