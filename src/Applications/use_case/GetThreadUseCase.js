class GetThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {
    await this._threadRepository.isThreadExist(threadId);
    const thread = await this._threadRepository.getThreadById(threadId);
    thread.comments.forEach((part, index, commentArray) => {
      if (part.isDelete) {
        commentArray[index] = '**komentar telah dihapus**';
      }
    });
    return thread;
  }
}

module.exports = GetThreadUseCase;
