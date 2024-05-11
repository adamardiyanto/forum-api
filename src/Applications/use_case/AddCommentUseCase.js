const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(owner, threadId, content) {
    const newComment = new NewComment(owner, threadId, content);
    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
