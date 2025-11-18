# 🐍 Game Snake - Expo & React Native

Game Snake sederhana yang dibuat dengan Expo dan React Native, cocok untuk pemula yang ingin belajar membuat game mobile.

## 🎮 Tentang Game

Game Snake klasik dengan kontrol swipe atau tombol panah. Makan makanan merah untuk menambah skor dan panjang ular. Hindari menabrak dinding atau tubuh sendiri!

## 🚀 Quick Start

### Instalasi Cepat

1. **Install dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan aplikasi:**
   ```bash
   npm start
   ```

3. **Pilih platform:**
   - Tekan `w` untuk web browser
   - Tekan `a` untuk Android emulator
   - Tekan `i` untuk iOS simulator
   - Scan QR code dengan Expo Go di smartphone

### Menjalankan di Platform Spesifik

```bash
# Web browser
npm run web

# Android emulator
npm run android

# iOS simulator (macOS saja)
npm run ios
```

## 📚 Dokumentasi Lengkap

- **[PANDUAN_INSTALASI.md](./PANDUAN_INSTALASI.md)** - Panduan instalasi lengkap dari awal
- **[GAME_TUTORIAL.md](./GAME_TUTORIAL.md)** - Tutorial belajar konsep-konsep yang digunakan

## 🎯 Fitur

- ✅ Kontrol swipe gesture
- ✅ Tombol kontrol arah
- ✅ Sistem skor
- ✅ Deteksi tabrakan
- ✅ Game over & restart
- ✅ UI yang menarik
- ✅ Mendukung Android, iOS, dan Web

## 🛠️ Teknologi yang Digunakan

- **Expo SDK 54** - Framework untuk React Native
- **React Native** - Framework mobile development
- **TypeScript** - Type-safe JavaScript
- **React Hooks** - useState, useEffect, useRef

## 📖 Belajar Lebih Lanjut

### Konsep yang Dipelajari

1. **State Management** - Mengelola state dengan useState
2. **Game Loop** - Membuat game loop dengan useEffect
3. **Touch Handling** - Menangani gesture dengan PanResponder
4. **Array Manipulation** - Mengelola posisi ular
5. **Conditional Rendering** - Menampilkan UI berdasarkan kondisi

### File Penting

- `components/snake-game.tsx` - Komponen utama game Snake
- `app/(tabs)/index.tsx` - Halaman utama aplikasi
- `GAME_TUTORIAL.md` - Penjelasan konsep-konsep yang digunakan

## 🐛 Troubleshooting

Jika mengalami masalah, lihat bagian **Troubleshooting** di [PANDUAN_INSTALASI.md](./PANDUAN_INSTALASI.md)

## 📝 Scripts Tersedia

```bash
npm start          # Menjalankan development server
npm run android    # Menjalankan di Android emulator
npm run ios        # Menjalankan di iOS simulator
npm run web        # Menjalankan di web browser
npm run lint       # Menjalankan linter
```

## 🚀 Ide Pengembangan

- [ ] Tingkat kesulitan (level system)
- [ ] Skor tertinggi (high score dengan AsyncStorage)
- [ ] Peningkatan kekuatan (power-ups)
- [ ] Mode multi pemain
- [ ] Animasi halus
- [ ] Efek suara
- [ ] Fitur jeda (pause)
- [ ] Rintangan di arena

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi dan pembelajaran.

## 🤝 Kontribusi

Silakan fork, modifikasi, dan kembangkan sesuai kebutuhan Anda!

---

**Selamat Bermain dan Belajar! 🎉**
