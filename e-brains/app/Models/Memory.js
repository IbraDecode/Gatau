import DBProvider from '../Providers/DatabaseProvider.js';
const db = DBProvider.get();
const Memory = {
  async init() {
    await db.runAsync(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, telegram_id TEXT, username TEXT, warnings INTEGER DEFAULT 0, blocked INTEGER DEFAULT 0, created_at TEXT, updated_at TEXT)`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS memories (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, keyname TEXT, value TEXT, created_at TEXT, updated_at TEXT)`);
  },
  async getUserWarnings(userId) {
    const row = await db.getAsync('SELECT warnings FROM users WHERE id = ?', userId);
    return row?.warnings || 0;
  },
  async setUserWarnings(userId, n) {
    const row = await db.getAsync('SELECT id FROM users WHERE id = ?', userId);
    const now = new Date().toISOString();
    if (row) await db.runAsync('UPDATE users SET warnings = ? , updated_at = ? WHERE id = ?', n, now, userId);
    else await db.runAsync('INSERT INTO users (id, warnings, telegram_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', userId, n, null, now, now);
  },
  async blockUser(userId) {
    const row = await db.getAsync('SELECT id FROM users WHERE id = ?', userId);
    const now = new Date().toISOString();
    if (row) await db.runAsync('UPDATE users SET blocked = 1, updated_at = ? WHERE id = ?', now, userId);
    else await db.runAsync('INSERT INTO users (id, blocked, warnings, created_at, updated_at) VALUES (?, 1, 3, ?, ?)', userId, now, now);
  },
  async isBlocked(userId) {
    const row = await db.getAsync('SELECT blocked FROM users WHERE id = ?', userId);
    return !!row?.blocked;
  },
  async saveMemory(key, value) {
    const now = new Date().toISOString();
    await db.runAsync('INSERT INTO memories (keyname, value, created_at, updated_at) VALUES (?, ?, ?, ?)', key, value, now, now);
  }
};
await Memory.init();
export default Memory;
