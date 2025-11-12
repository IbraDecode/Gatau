# E-Brains

Bot Telegram simpel pake Telegraf v4 sama Node.js ESM.

## Cara jalanin

1. Copy `.env.example` jadi `.env`, isi TELEGRAM_TOKEN sama DB_PATH.
2. npm install
3. node artisan migrate
4. node artisan seed
5. node artisan serve

## Troubleshooting

### Bot nggak bales

Ini beberapa alasan kenapa bot nggak respon, sama cara fix-nya:

- **File .env ilang:** Pastiin ada file `.env` yang isinya TELEGRAM_TOKEN yang valid. Token bot ambil dari @BotFather di Telegram. Contoh: TELEGRAM_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
- **Versi Telegraf salah:** Di package.json dulunya ^5.8.0 yang nggak ada, udah ganti jadi ^4.16.3 biar bisa install.
- **Error di artisan:** Ada syntax error kayak 'return' di luar function, atau await tanpa async. Udah fix biar migrate sama seed jalan.
- **Import ProcessorProvider salah:** Dulunya import default, tapi sebenarnya named export. Udah ganti jadi import { ProcessorProvider }.
- **Bot nggak diluncurin:** Di AppServiceProvider dulunya cuma mount webhook, nggak ada launch(). Udah tambah bot.launch() biar polling.
- **Masalah polling:** Kalau di server tanpa internet langsung, mending pake webhook. Set webhook URL lewat API Telegram: https://api.telegram.org/bot<TOKEN>/setWebhook?url=<URL_WEBHOOK_KAMU>

### Launch hang

Kalau `node artisan serve` hang di "Bot launching...", mungkin gara-gara batasan jaringan di environment ini. Buat dev lokal, pastiin internet stabil. Buat production, pake webhook aja.