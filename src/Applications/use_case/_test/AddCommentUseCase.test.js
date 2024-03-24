const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('addCommentUseCase ', () => {
  it('should orchestrating the add comment action correctly ', async () => {
    const useCaseOwner = 'user-123';
    const useCasePayload = {
      content: 'new comment',
    };

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCaseOwner,
    });

    const mockCommentRepository = new CommentRepository();

    mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(mockAddedComment));

    const addCommentUseCase = new AddCommentUseCase({ commentRepository: mockCommentRepository });

    const addedComment = await addCommentUseCase.execute(useCaseOwner, useCasePayload);

    expect(addedComment).toStrictEqual(mockAddedComment);

    expect(mockCommentRepository.addComment).toBeCalledWith(new NewComment(useCaseOwner, { content: useCasePayload.content }));
  });
});
