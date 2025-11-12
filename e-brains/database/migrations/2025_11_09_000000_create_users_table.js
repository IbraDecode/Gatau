import DBProvider from '../../app/Providers/DatabaseProvider.js';
const db = DBProvider.get();
export default {
  async up() {
    await db.runAsync(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, telegram_id TEXT, username TEXT, warnings INTEGER DEFAULT 0, blocked INTEGER DEFAULT 0, created_at TEXT, updated_at TEXT)`);
  },
  async down() {
    await db.runAsync('DROP TABLE IF EXISTS users');
  }
};
