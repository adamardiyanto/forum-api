const Thread = require('../Thread');
const Comment = require('../../../comments/entities/Comment');

describe('Thread entities ', () => {
  it('should throw error when payload doesnt contain needed property ', () => {
    const payload = {
      title: 'new thread',
    };

    expect(() => new Thread(payload).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY'));
  });

  it('should throw error when payload not meet data type specification ', () => {
    const payload = {
      id: 123,
      title: 'new thread',
      body: 'body thread',
      date: '2024-03-17',
      username: 'user-123',
      comments: {},
    };

    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Thread entities correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'new thread',
      body: 'body thread',
      date: '2024-03-17',
      username: 'user-123',
      comments: [
        new Comment({
          id: 'comment-123',
          content: 'this content',
          username: 'joe',
          date: '2024-03-17',
          isDelete: false,
        }),
        new Comment({
          id: 'comment-124',
          username: 'user-123',
          content: 'this content2',
          date: '2024-03-17',
          isDelete: true,
        }),
      ],
    };

    const thread = new Thread(payload);

    expect(thread).toBeInstanceOf(Thread);
    expect(thread.id).toEqual(payload.id);
    expect(thread.title).toEqual(payload.title);
    expect(thread.body).toEqual(payload.body);
    expect(thread.date).toEqual(payload.date);
    expect(thread.owner).toEqual(payload.owner);
    expect(thread.comments.length).toEqual(payload.comments.length);
    expect(thread.comments.length).toEqual(2);
    expect(thread.comments[0]).toStrictEqual(payload.comments[0]);
    expect(thread.comments[1]).toStrictEqual(payload.comments[1]);
  });
});
