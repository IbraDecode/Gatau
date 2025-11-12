import Memory from '../Models/Memory.js';
export class ProcessorProvider {
  constructor(db) {
    this.db = db;
    this.memory = Memory;
  }
  async incrementWarning(userId) {
    const current = await this.memory.getUserWarnings(userId) || 0;
    const next = current + 1;
    await this.memory.setUserWarnings(userId, next);
    return next;
  }
  async blockUser(userId) {
    await this.memory.blockUser(userId);
  }
}
