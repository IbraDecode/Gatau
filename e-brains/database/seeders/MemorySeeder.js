import DBProvider from '../../app/Providers/DatabaseProvider.js';
const db = DBProvider.get();
export default {
  async run() {
    const now = new Date().toISOString();
    await db.runAsync('INSERT INTO memories (user_id, keyname, value, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', ['0','welcome','E-Brains base memories initialized', now, now]);
  }
};
