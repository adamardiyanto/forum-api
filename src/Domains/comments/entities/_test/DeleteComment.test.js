const DeleteComment = require('../DeleteComment');

describe('a new comment entities ', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-test',
    };
    const owner = 'user-test';
    // Action and Assert
    expect(() => new DeleteComment(owner, payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet type specification property', () => {
    // Arrange
    const payload = {
      id: 'comment-test',
      threadId: 1234,
    };
    const owner = 'user-test';
    // Action and Assert
    expect(() => new DeleteComment(owner, payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when owner did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-test',
    };
    const owner = null;
    // Action and Assert
    expect(() => new DeleteComment(owner, payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when owner did not meet type specification property', () => {
    // Arrange
    const payload = {
      id: 'comment-test',
      threadId: 'thread-test',
    };
    const owner = 123;
    // Action and Assert
    expect(() => new DeleteComment(owner, payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DeleteComment entities correctly', () => {
    const payload = {
      id: 'comment-test',
      threadId: 'thread-test',
    };
    const owner = 'user-test';
    const deleteComment = new DeleteComment(owner, payload);

    expect(deleteComment).toBeInstanceOf(DeleteComment);
    expect(deleteComment.id).toEqual(payload.id);
    expect(deleteComment.owner).toEqual(owner);
    expect(deleteComment.threadId).toEqual(payload.threadId);
  });
});
