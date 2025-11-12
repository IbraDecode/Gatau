import { Telegraf } from 'telegraf';
import express from 'express';
import { wordsFilter } from '../../Services/WordsFilter.js';
import { ProcessorProvider } from '../../Providers/ProcessorProvider.js';
import Memory from '../../Models/Memory.js';
import Database from '../../Providers/DatabaseProvider.js';
export class BotController {
  constructor() {
    this.token = process.env.TELEGRAM_TOKEN || '';
    this.bot = new Telegraf(this.token);
    this.processor = new ProcessorProvider();
    this.memory = Memory;
    this.setup();
  }
  setup() {
    this.bot.use(async (ctx, next) => {
      if (ctx.message?.text) ctx.state.forbidden = wordsFilter.has(ctx.message.text);
      return next();
    });
    this.bot.on('text', async (ctx) => {
      const userId = String(ctx.from.id);
      if (await this.memory.isBlocked(userId)) return ctx.reply('You are blocked.');
      if (ctx.state.forbidden) {
        const warnings = await this.processor.incrementWarning(userId);
        if (warnings >= 3) {
          await this.processor.blockUser(userId);
          return ctx.reply('You have been blocked permanently due to repeated violations.');
        }
        return ctx.reply(`Warning ${warnings}/3: prohibited word detected.`);
      }
      if (ctx.message.text === '/start') return ctx.reply('Welcome to E-Brains');
      return ctx.reply('Message received');
    });
  }
  async launch() {
    console.log('Bot launching...');
    try {
      await this.bot.launch();
      console.log('Bot launched successfully');
    } catch (error) {
      console.error('Error launching bot:', error);
    }
  }
  mountWebhook(app) {
    const router = express.Router();
    router.post('/bot/webhook', express.json(), async (req, res) => {
      await this.bot.handleUpdate(req.body, res);
      res.sendStatus(200);
    });
    app.use(router);
  }
}
