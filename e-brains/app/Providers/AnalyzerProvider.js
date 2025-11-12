export class AnalyzerProvider {
  constructor() {
    this.forbidden = new Set();
  }
  setList(list) {
    this.forbidden = new Set(list.map(s => s.toLowerCase()));
  }
  detectForbidden(text) {
    if (!text) return null;
    const normalized = text.toLowerCase();
    for (const word of this.forbidden) if (normalized.includes(word)) return word;
    return null;
  }
}
