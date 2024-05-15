const GetThreadUseCase = require('../GetThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const Thread = require('../../../Domains/threads/entities/Thread');
const Comment = require('../../../Domains/comments/entities/Comment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');

describe('getThreadUseCase ', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const expectedThread = new Thread({
      id: 'thread-123',
      title: 'new thread',
      body: 'body thread',
      date: '2024-03-17',
      username: 'user-123',
      comments: [
        new Comment({
          id: 'comment-123',
          username: 'joe',
          content: 'this content',
          date: '2024-03-17',
          isDelete: false,
        }),
        new Comment({
          id: 'comment-125',
          username: 'joe',
          content: '**komentar telah dihapus**',
          date: '2024-03-17',
          isDelete: true,
        }),
      ],
    });

    const expectedComments = [
      new Comment({
        id: 'comment-123',
        username: 'joe',
        content: 'this content',
        date: '2024-03-17',
        isDelete: false,
      }),
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(new Thread({
      id: 'thread-123',
      title: 'new thread',
      body: 'body thread',
      date: '2024-03-17',
      username: 'user-123',
      comments: [],
    })));
    mockThreadRepository.isThreadExists = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.getCommentByThreadId = jest.fn().mockImplementation(() => Promise.resolve([
      new Comment({
        id: 'comment-123',
        username: 'joe',
        content: 'this content',
        date: '2024-03-17',
        isDelete: false,
      }),
      new Comment({
        id: 'comment-125',
        username: 'joe',
        content: 'this content',
        date: '2024-03-17',
        isDelete: true,
      }),
    ]));

    const getThreadUseCase = new GetThreadUseCase({ threadRepository: mockThreadRepository, commentRepository: mockCommentRepository });

    const getThread = await getThreadUseCase.execute('thread-123');
    expect(getThread).toStrictEqual(expectedThread);
    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-123');
    expect(mockThreadRepository.isThreadExists).toBeCalled();
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith('thread-123');
  });
});
