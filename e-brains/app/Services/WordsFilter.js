import fs from 'fs';
import path from 'path';
function normalize(s){ return s.toLowerCase().normalize('NFKD').replace(/\p{M}/gu,'').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim(); }
export class WordsFilter {
  constructor() {
    this.words = new Set();
    this.load();
  }
  load() {
    const dir = path.resolve('resources','wordlists');
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f=>f.endsWith('.txt'));
    for (const f of files) {
      const lines = fs.readFileSync(path.join(dir,f),'utf8').split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
      for (const l of lines) this.words.add(l.toLowerCase());
    }
  }
  reload(){ this.words.clear(); this.load(); }
  has(text){
    if(!text) return false;
    const norm = normalize(text);
    const tokens = norm.split(/\s+/);
    for (const t of tokens) if (this.words.has(t)) return true;
    return false;
  }
}
export const wordsFilter = new WordsFilter();
