const GetThreadUseCase = require('../GetThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const Thread = require('../../../Domains/threads/entities/Thread');
const Comment = require('../../../Domains/comments/entities/Comment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');

describe('getThreadUseCase ', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const expectedThread = {
      id: 'thread-333',
      title: 'new thread',
      body: 'body thread',
      date: '2024-03-17',
      username: 'user-test',
      comments: [
        {
          id: 'comment-test',
          username: 'joe',
          content: 'this content',
          date: '2024-03-17',
          isDelete: false,
        },
        {
          id: 'comment-125',
          username: 'joe',
          content: '**komentar telah dihapus**',
          date: '2024-03-17',
          isDelete: true,
        },
      ],
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve({
      id: 'thread-333',
      title: 'new thread',
      body: 'body thread',
      date: '2024-03-17',
      username: 'user-test',
      comments: [],
    }));
    mockThreadRepository.isThreadExists = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.getCommentByThreadId = jest.fn().mockImplementation(() => Promise.resolve([
      {
        id: 'comment-test',
        username: 'joe',
        content: 'this content',
        date: '2024-03-17',
        isDelete: false,
      },
      {
        id: 'comment-125',
        username: 'joe',
        content: '**komentar telah dihapus**',
        date: '2024-03-17',
        isDelete: true,
      },
    ]));

    const getThreadUseCase = new GetThreadUseCase({ threadRepository: mockThreadRepository, commentRepository: mockCommentRepository });

    const detailThread = await getThreadUseCase.execute('thread-333');
    expect(detailThread).toStrictEqual(expectedThread);
    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-333');
    expect(mockThreadRepository.isThreadExists).toBeCalled();
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith('thread-333');
    expect(detailThread.comments).toHaveLength(2);
  });
});
