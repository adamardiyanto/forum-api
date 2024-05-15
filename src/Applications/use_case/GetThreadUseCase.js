class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    await this._threadRepository.isThreadExists(threadId);
    const threadDetail = await this._threadRepository.getThreadById(threadId);
    threadDetail.comments = await this._commentRepository.getCommentByThreadId(threadId);
    threadDetail.comments.forEach((part, index, commentArrays) => {
      if (part.isDelete) {
        commentArrays[index].content = '**komentar telah dihapus**';
      }
    });

    return threadDetail;
  }
}

module.exports = GetThreadUseCase;
