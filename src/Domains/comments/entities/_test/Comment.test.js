const Comment = require('../Comment');

describe('Comment entities ', () => {
  it('should throw error when payload doesnt contain needed property ', () => {
    const payload = {
      content: 'new comment',
    };
    expect(() => new Comment(payload).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'));
  });

  it('should throw error when payload not meet data type specification ', () => {
    const payload = {
      content: 'new comment',
      owner: 12345,
      threadId: 'thread-123',
    };

    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Comment entities correctly', () => {
    const payload = {
      content: 'new comment',
      owner: 'user-123',
      threadId: 'thread-123',
    };

    const comment = new Comment(payload);

    expect(comment).toBeInstanceOf(Comment);
    expect(comment.content).toEqual(payload.content);
    expect(comment.owner).toEqual(payload.owner);
    expect(comment.threadId).toEqual(payload.threadId);
  });
});
