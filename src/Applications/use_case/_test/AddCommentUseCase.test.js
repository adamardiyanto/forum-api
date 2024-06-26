const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase usecase ', () => {
  it('should orchestrating the add comment action correctly ', async () => {
    const useCaseOwner = 'user-test';
    const threadId = 'thread-test';
    const useCasePayload = {
      content: 'new comment',
    };

    const mockAddedComment = new AddedComment({
      id: 'comment-test',
      content: useCasePayload.content,
      owner: useCaseOwner,
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.isThreadExists = jest.fn(() => Promise.resolve());

    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(
      new AddedComment({
        id: 'comment-test',
        content: useCasePayload.content,
        owner: useCaseOwner,
      }),
    ));

    const addCommentUseCase = new AddCommentUseCase({ commentRepository: mockCommentRepository, threadRepository: mockThreadRepository });

    const addedComment = await addCommentUseCase.execute(useCaseOwner, threadId, useCasePayload);

    expect(addedComment).toStrictEqual(mockAddedComment);

    expect(mockCommentRepository.addComment).toBeCalledWith(new NewComment(useCaseOwner, threadId, useCasePayload.content));
    expect(mockThreadRepository.isThreadExists).toBeCalledWith(threadId);
  });
});
