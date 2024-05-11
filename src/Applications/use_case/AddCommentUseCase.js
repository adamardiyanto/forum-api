const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(owner, threadId, payload) {
    const { content } = payload;
    const newComment = new NewComment(owner, threadId, content);
    await this._threadRepository.isThreadExists(threadId);
    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
