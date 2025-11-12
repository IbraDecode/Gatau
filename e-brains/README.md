# E-Brains

Bot Telegram sederhana pake Telegraf v4 dan Node.js ESM modern.

## Cara mulai cepat

1. Copy `.env.example` jadi `.env` dan isi TELEGRAM_TOKEN sama DB_PATH.
2. npm install
3. node artisan migrate
4. node artisan seed
5. node artisan serve

## Troubleshooting

### Bot nggak respon

Ini beberapa penyebab kenapa bot nggak bales pesan, sama cara fix-nya:

- **File .env hilang:** Pastiin ada file `.env` yang isinya TELEGRAM_TOKEN yang bener. Token bot harus diambil dari @BotFather di Telegram. Contoh: TELEGRAM_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
- **Versi Telegraf salah:** Di package.json dulunya pake ^5.8.0 yang nggak ada, udah diganti jadi ^4.16.3 biar bisa install.
- **Error di script artisan:** Ada syntax error kayak 'return' di luar function, atau await tanpa async. Udah diperbaiki biar migrate sama seed bisa jalan.
- **Import ProcessorProvider salah:** Dulunya import default, tapi sebenarnya named export. Udah diganti jadi import { ProcessorProvider }.
- **Bot nggak diluncurin:** Di AppServiceProvider dulunya cuma mount webhook, nggak ada launch(). Udah ditambah bot.launch() biar bot polling.
- **Masalah polling:** Kalau di server tanpa internet langsung, mending pake webhook. Set webhook URL lewat API Telegram: https://api.telegram.org/bot<TOKEN>/setWebhook?url=<URL_WEBHOOK_KAMU>

### Launch bot hang

Kalau pas `node artisan serve` hang di "Bot launching...", mungkin gara-gara batasan jaringan di environment ini. Buat development lokal, pastiin koneksi internet stabil. Buat production, pake webhook aja.
