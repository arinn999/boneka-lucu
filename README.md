# 🧸 PlushieStore - Website Toko Boneka

Aplikasi web e-commerce toko boneka berbasis **HTML, CSS, dan Vanilla JavaScript** tanpa memerlukan backend/database eksternal (menggunakan `localStorage` browser untuk menyimpan sesi, produk, dan keranjang).

## ✨ Fitur Utama
1. **Katalog Produk**: Menampilkan daftar boneka lengkap dengan gambar, nama penjual, dan format harga Rupiah.
2. **Sistem Login & Logout**: Pengguna harus login terlebih dahulu sebelum menambahkan barang ke keranjang atau menjual produk.
3. **Fitur Jual Boneka**: Pengguna yang sudah login dapat menambahkan boneka baru (nama, harga, dan URL gambar) langsung ke etalase toko.
4. **Keranjang Belanja Interaktif**:
   - Menambahkan produk ke keranjang.
   - Mengatur jumlah kuantitas (`+` / `-`) atau menghapus item.
   - Menghitung total harga secara otomatis dan simulasi checkout.

## 📁 Struktur File
- `index.html` — Struktur halaman utama dan komponen modal (Login, Jual, Keranjang).
- `style.css` — Desain responsif, tata letak grid produk, dan styling modal.
- `script.js` — Logika interaktif, manajemen state keranjang, autentikasi, dan penyimpanan `localStorage`.
- `README.md` — Dokumentasi proyek.

## 🚀 Cara Menjalankan
1. Unduh atau simpan keempat file (`index.html`, `style.css`, `script.js`, `README.md`) ke dalam satu folder yang sama.
2. Klik dua kali pada file `index.html` untuk membukanya di browser (Chrome, Edge, Firefox, dll).
3. Klik tombol **Login** di pojok kanan atas (masukkan username dan password bebas) untuk membuka akses keranjang dan tombol **+ Jual Boneka**.
