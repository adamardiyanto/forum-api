const DeleteComment = require('../DeleteComment');

describe('a new comment entities ', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
    };
    const owner = 'user-123';
    // Action and Assert
    expect(() => new DeleteComment(owner, payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should create DeleteComment entities correctly', () => {
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
    };
    const owner = 'user-123';
    const deleteComment = new DeleteComment(owner, payload);

    expect(deleteComment).toBeInstanceOf(DeleteComment);
    expect(deleteComment.id).toEqual(payload.id);
    expect(deleteComment.owner).toEqual(owner);
    expect(deleteComment.threadId).toEqual(payload.threadId);
  });
});
