const NewComment = require('../NewComment');

describe('a new comment entities ', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const threadId = '';
    const payload = {
      content: 'abc',
    };
    const owner = 'user-123';
    // Action and Assert
    expect(() => new NewComment(owner, threadId, payload.content)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should create NewComment entities correctly', () => {
    const payload = {
      content: 'new comment',
    };
    const owner = 'user-123';
    const threadId = 'thread-123';
    const newComment = new NewComment(owner, threadId, payload.content);

    expect(newComment).toBeInstanceOf(NewComment);
    expect(newComment.content).toEqual(payload.content);
    expect(newComment.owner).toEqual(owner);
    expect(newComment.threadId).toEqual(threadId);
  });
});
