const AddedComment = require('../AddedComment');

describe('an addedComment entities ', () => {
  it('should throw error when payload doesnt contain needed property ', () => {
    const payload = {
      content: null,
      owner: 12345,
      id: 'comment-test',
    };
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification ', () => {
    const payload = {
      content: 'new comment',
      owner: 12345,
      id: 'comment-test',
    };

    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Comment entities correctly', () => {
    const payload = {
      content: 'new comment',
      owner: 'user-test',
      id: 'comment-test',
    };

    const addedComment = new AddedComment(payload);

    expect(addedComment).toBeInstanceOf(AddedComment);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.owner).toEqual(payload.owner);
    expect(addedComment.id).toEqual(payload.id);
  });
});
