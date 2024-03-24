const NewThread = require('../../Domains/threads/entities/NewThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(owner, useCasePayload) {
    const newThread = new NewThread(owner, useCasePayload);
    return this._threadRepository.addThread(newThread);
  }
}

module.exports = AddThreadUseCase;
