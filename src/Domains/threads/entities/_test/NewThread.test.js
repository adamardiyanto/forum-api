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

  it('should create newthread object correctly', () => {
    const payload = {
      title: 'new thread',
      body: 'body thread',
    };
    const owner = 'user-123';
    const { title, body } = new NewThread(owner, payload);

    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(owner);
  });
});
