const NewComment = require('../NewComment');

describe('a new comment entities ', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const threadId = 'thread-test';
    const payload = {
      content: null,
    };
    const owner = 'user-test';
    // Action and Assert
    expect(() => new NewComment(owner, threadId, payload.content)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const threadId = null;
    const payload = {
      content: 'komen',
    };
    const owner = 'user-test';
    // Action and Assert
    expect(() => new NewComment(owner, threadId, payload.content)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const threadId = '';
    const payload = {
      content: 123,
    };
    const owner = 'user-test';
    // Action and Assert
    expect(() => new NewComment(owner, threadId, payload.content)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should throw error when owner did not contain needed property', () => {
    // Arrange
    const threadId = 'thread-test';
    const payload = {
      content: 'abc',
    };
    const owner = null;
    // Action and Assert
    expect(() => new NewComment(owner, threadId, payload.content)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when owner did not contain needed property', () => {
    // Arrange
    const threadId = 'thread-test';
    const payload = {
      content: 'abc',
    };
    const owner = 123;
    // Action and Assert
    expect(() => new NewComment(owner, threadId, payload.content)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should throw error when owner did not contain needed property', () => {
    // Arrange
    const threadId = 123;
    const payload = {
      content: 'abc',
    };
    const owner = 'user-test';
    // Action and Assert
    expect(() => new NewComment(owner, threadId, payload.content)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create NewComment entities correctly', () => {
    const payload = {
      content: 'new comment',
    };
    const owner = 'user-test';
    const threadId = 'thread-test';
    const newComment = new NewComment(owner, threadId, payload.content);

    expect(newComment).toBeInstanceOf(NewComment);
    expect(newComment.content).toEqual(payload.content);
    expect(newComment.owner).toEqual(owner);
    expect(newComment.threadId).toEqual(threadId);
  });
});
