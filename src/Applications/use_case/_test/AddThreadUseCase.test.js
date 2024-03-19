const NewThread = require('../../../Domains/threads/entities/NewThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddthreadUseCase');

describe('addThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const useCasePayload = {
      title: 'new thread',
      body: '12345',
      date: '2024-03-17',
      owner: 'user-123',
    };

    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      date: useCasePayload.date,
      owner: useCasePayload.owner,
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve(mockAddedThread));
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(mockAddedThread));
    mockThreadRepository.isThreadExist = jest.fn().mockImplementation(() => Promise.resolve());

    const getThreadUseCase = new AddThreadUseCase({ threadRepository: mockThreadRepository });

    const addedThread = await getThreadUseCase.execute(useCasePayload);

    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      date: useCasePayload.date,
      owner: useCasePayload.owner,
    }));

    expect(mockThreadRepository.addThread).toBeCalledWith(new NewThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
      date: useCasePayload.date,
      owner: useCasePayload.owner,
    }));
  });
});
