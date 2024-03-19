const AddedComment = require('../AddedComment');

describe('an addedComment entities ', () => {
  it('should throw error when payload doesnt contain needed property ', () => {
    const payload = {
      content: 'new comment',
    };
    expect(() => new Comment(payload).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'));
  });

  it('should throw error when payload not meet data type specification ', () => {
    const payload = {
      content: 'new comment',
      owner: 12345,
      threadId: 'thread-123',
    };

    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Comment entities correctly', () => {
    const payload = {
      content: 'new comment',
      owner: 'user-123',
      threadId: 'thread-123',
    };

    const addedComment = new AddedComment(payload);

    expect(addedComment).toBeInstanceOf(AddedComment);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.owner).toEqual(payload.owner);
    expect(addedComment.threadId).toEqual(payload.threadId);
  });
});
