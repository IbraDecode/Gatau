export default {
  client: 'sqlite3',
  connection: {
    filename: process.env.DB_PATH || './storage/memory.db'
  },
  useNullAsDefault: true
};
