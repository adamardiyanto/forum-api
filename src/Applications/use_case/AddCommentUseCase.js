const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(owner, useCasePayload) {
    const newComment = new NewComment(owner, useCasePayload);
    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
