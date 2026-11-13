# Zanira EduAI — Website siap deploy ke Netlify

## Isi paket
- `index.html`: dashboard responsif dan formulir prompt.
- `netlify/functions/generate.js`: fungsi backend untuk memanggil OpenAI dengan aman.
- `netlify.toml`: konfigurasi Netlify.

## Cara deploy
1. Ekstrak ZIP ini di HP atau komputer.
2. Masuk ke Netlify dan login.
3. Untuk menggunakan fungsi backend, deploy melalui Git (disarankan) atau Netlify CLI. Drag-and-drop folder statis saja mungkin tidak membangun fungsi serverless dengan benar.
4. Cara paling mudah untuk pemula: unggah folder ini ke repositori GitHub baru, lalu di Netlify pilih **Add new site → Import an existing project** dan hubungkan repositori itu.
5. Setelah deploy, buka **Site configuration → Environment variables** (nama menu dapat sedikit berbeda).
6. Tambahkan `OPENAI_API_KEY` dengan API key OpenAI milik Anda. Jangan pernah menaruh API key di `index.html` atau membagikannya ke orang lain.
7. Opsional: tambahkan `OPENAI_MODEL` dengan nilai `gpt-4.1-mini`.
8. Jalankan redeploy agar environment variable digunakan.
9. Buka URL website Netlify, isi topik dan usia, lalu tekan **Buat Prompt dengan AI**.

## Catatan penting
- Website dan formulir dapat dibuka tanpa API key. Jika belum tersambung, tombol generate menampilkan prompt dasar yang disusun dari formulir.
- Untuk hasil AI langsung di website, diperlukan API key yang valid dan akun API dengan billing/kredit aktif. Biaya penggunaan API terpisah dari langganan ChatGPT.
- Jangan membagikan ZIP yang berisi API key. API key hanya disimpan pada Environment Variables Netlify.
- Ini adalah versi awal (MVP). Tool lain memakai form yang sama dengan instruksi jenis media berbeda; bisa dikembangkan lebih lanjut.
