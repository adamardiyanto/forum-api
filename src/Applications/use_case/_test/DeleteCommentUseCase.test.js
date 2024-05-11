const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('deleteUseCase ', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const owner = 'user-123';
    const id = 'comment-123';
    const threadId = 'thread-123';

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.isThreadExists = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteComment = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = jest.fn().mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({ threadRepository: mockThreadRepository, commentRepository: mockCommentRepository });

    await expect(deleteCommentUseCase.execute(owner, threadId, id)).resolves.not.toThrowError();
    expect(mockThreadRepository.isThreadExists).toBeCalledWith(threadId);
    expect(mockCommentRepository.deleteComment).toBeCalledWith(owner, threadId, id);
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(owner, id);
  });
});
