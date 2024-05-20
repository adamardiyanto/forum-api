const NewThread = require('../../../Domains/threads/entities/NewThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddthreadUseCase');

describe('addThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const useCaseOwner = 'user-test';
    const useCasePayload = {
      title: 'new thread',
      body: '12345',
    };

    const mockAddedThread = new AddedThread({
      id: 'thread-test',
      title: useCasePayload.title,
      owner: useCaseOwner,
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(new AddedThread({
      id: 'thread-test',
      title: useCasePayload.title,
      owner: useCaseOwner,
    })));

    const addThreadUseCase = new AddThreadUseCase({ threadRepository: mockThreadRepository });

    const addedThread = await addThreadUseCase.execute(useCaseOwner, useCasePayload);

    expect(addedThread).toStrictEqual(mockAddedThread);

    expect(mockThreadRepository.addThread).toBeCalledWith(new NewThread(useCaseOwner, {
      title: useCasePayload.title,
      body: useCasePayload.body,
    }));
  });
});
