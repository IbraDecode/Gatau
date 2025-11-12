# e-brains bot fix

bot nggak respon karena:
- file .env hilang, token kosong.
- versi telegraf salah (^5.8.0 -> ^4.16.3).
- error syntax di artisan.
- import processorprovider salah.
- bot nggak launch.

udah di-fix semua. bot sekarang bisa jalan.

cara jalanin:
1. copy .env.example ke .env, isi token.
2. npm install
3. node artisan migrate
4. node artisan seed
5. node artisan serve

kalau masalah lagi, bilang.