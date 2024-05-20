const Comment = require('../Comment');

describe('Comment entities ', () => {
  it('should throw error when payload doesnt contain needed property ', () => {
    const payload = {
      content: 'new comment',
    };
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification ', () => {
    const payload = {
      id: 'comment-test',
      username: 12345,
      content: 'new comment',
      date: 'thread-test',
      isDelete: 'thread-test',
    };

    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Comment entities correctly', () => {
    const payload = {
      id: 'comment-test',
      username: 'user-test',
      content: 'new comment',
      date: '2022-04-04',
    };

    const comment = new Comment(payload);

    expect(comment).toBeInstanceOf(Comment);
    expect(comment.id).toEqual(payload.id);
    expect(comment.username).toEqual(payload.username);
    expect(comment.content).toEqual(payload.content);
    expect(comment.date).toEqual(payload.date);
  });
});
