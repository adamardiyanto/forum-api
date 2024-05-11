const GetThreadUseCase = require('../GetThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const Thread = require('../../../Domains/threads/entities/Thread');
const Comment = require('../../../Domains/comments/entities/Comment');

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
          id: 'comment-124',
          username: 'user-123',
          content: 'this content2',
          date: '2024-03-17',
          isDelete: false,
        }),
      ],
    });

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(expectedThread));
    mockThreadRepository.isThreadExist = jest.fn().mockImplementation(() => Promise.resolve());

    const getThreadUseCase = new GetThreadUseCase({ threadRepository: mockThreadRepository });

    const getThread = await getThreadUseCase.execute('thread-123');

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-123');
    expect(mockThreadRepository.isThreadExist).toBeCalled();
  });
});
