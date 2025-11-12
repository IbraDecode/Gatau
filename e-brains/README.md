# E-Brains Bot Fix

Bot nggak respon karena:
- File .env hilang, token kosong.
- Versi Telegraf salah (^5.8.0 -> ^4.16.3).
- Error syntax di artisan.
- Import ProcessorProvider salah.
- Bot nggak launch.

Udah di-fix semua. Bot sekarang bisa jalan.

Cara jalanin:
1. Copy .env.example ke .env, isi token.
2. npm install
3. node artisan migrate
4. node artisan seed
5. node artisan serve

Kalau masalah lagi, bilang.