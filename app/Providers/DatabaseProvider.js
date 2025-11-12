import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import { promisify } from 'util';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.DB_PATH || path.join(__dirname, '..', '..', 'storage', 'memory.db');
sqlite3.verbose();
let instance = null;
export default class DBProvider {
  static get() {
    if (!instance) {
      instance = new sqlite3.Database(dbPath);
      instance.runAsync = promisify(instance.run.bind(instance));
      instance.getAsync = promisify(instance.get.bind(instance));
      instance.allAsync = promisify(instance.all.bind(instance));
      instance.execAsync = promisify(instance.exec.bind(instance));
    }
    return instance;
  }
}
