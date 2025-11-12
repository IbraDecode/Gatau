import { BotController } from '../Http/Controllers/BotController.js';
import path from 'path';
export class AppServiceProvider {
  static async register(app) {
    app.get('/', (req, res) => res.render('welcome'));
    app.get('/dashboard', (req, res) => res.render('dashboard'));
    app.get('/admin', (req, res) => res.render('admin'));
    const botCtrl = new BotController();
    botCtrl.mountWebhook(app);
    await botCtrl.launch(); // Launch the bot for polling
  }
}
