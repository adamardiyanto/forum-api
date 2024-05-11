class DeleteCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(owner, threadId, Id) {
    await this._threadRepository.isThreadExist(threadId);
    await this._commentRepository.verifyCommentOwner(owner, Id);
    await this._commentRepository.deleteComment(owner, threadId, Id);
  }
}

module.exports = DeleteCommentUseCase;
