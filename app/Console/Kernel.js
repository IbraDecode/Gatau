export class Kernel {
  constructor() {
    this.commands = new Map();
  }
  register(name, fn) {
    this.commands.set(name, fn);
  }
  async handle(argv) {
    const cmd = argv[0] || 'help';
    if (!this.commands.has(cmd)) {
      console.log('Available commands:', Array.from(this.commands.keys()).join(', '));
      return;
    }
    await this.commands.get(cmd)(argv.slice(1));
  }
}
