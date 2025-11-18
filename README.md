# 🐍 Game Snake - Expo & React Native

Game Snake sederhana yang dibuat dengan Expo dan React Native, cocok untuk pemula yang ingin belajar membuat game mobile.

## 🎮 Tentang Game

Game Snake klasik dengan kontrol swipe atau tombol panah. Makan makanan merah untuk menambah skor dan panjang ular. Hindari menabrak dinding atau tubuh sendiri!

## 📦 Instalasi Step-by-Step

### Persyaratan Sistem

Sebelum memulai, pastikan Anda memiliki:
- **Node.js** versi 18.x atau lebih baru (disarankan 20.x)
- **npm** (biasanya sudah termasuk dengan Node.js)
- **Git** (untuk clone repository)

### Langkah 1: Instalasi Node.js dan npm

#### Windows
1. Kunjungi https://nodejs.org/
2. Unduh versi **LTS** (Long Term Support)
3. Jalankan installer dan ikuti wizard
4. Pastikan opsi "Add to PATH" dicentang
5. Restart Command Prompt setelah instalasi

#### macOS
1. Kunjungi https://nodejs.org/
2. Unduh versi **LTS** untuk macOS
3. Jalankan installer `.pkg`
4. Ikuti wizard instalasi

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verifikasi instalasi:**
```bash
node --version
npm --version
```

Anda harus melihat versi Node.js dan npm, contoh:
```
v20.10.0
10.2.3
```

### Langkah 2: Instalasi Expo CLI

Instal Expo CLI secara global:

```bash
npm install -g expo-cli
```

**Verifikasi instalasi:**
```bash
expo --version
```

### Langkah 3: Clone atau Download Project

#### Opsi A: Clone dengan Git (Disarankan)
```bash
git clone https://github.com/edisuherlan/game-expo-snake-sederhana.git
cd game-expo-snake-sederhana
```

#### Opsi B: Download ZIP
1. Kunjungi https://github.com/edisuherlan/game-expo-snake-sederhana
2. Klik tombol **Code** → **Download ZIP**
3. Ekstrak file ZIP
4. Buka terminal di folder yang diekstrak

### Langkah 4: Install Dependencies

Masuk ke folder project dan install semua library yang diperlukan:

```bash
cd game-expo-snake-sederhana
npm install
```

**Proses ini akan:**
- Mengunduh semua package yang diperlukan (React, React Native, Expo, dll)
- Menginstal dependencies ke folder `node_modules`
- Membuat file `package-lock.json`

⏳ **Tunggu hingga proses selesai** (biasanya 2-5 menit tergantung koneksi internet)

**Dependencies yang akan diinstall:**
- `expo` (~54.0.24) - Framework Expo
- `react` (19.1.0) - Library React
- `react-native` (0.81.5) - Framework React Native
- `expo-router` (~6.0.15) - Routing untuk Expo
- `react-native-reanimated` (~4.1.1) - Animasi
- `react-native-gesture-handler` (~2.28.0) - Gesture handling
- Dan library lainnya (lihat `package.json`)

### Langkah 5: Verifikasi Instalasi

Pastikan semua dependencies terinstall dengan benar:

```bash
npm list --depth=0
```

Atau cek apakah folder `node_modules` sudah ada:
```bash
ls node_modules  # macOS/Linux
dir node_modules # Windows
```

### Langkah 6: Menjalankan Aplikasi

Jalankan development server:

```bash
npm start
```

Atau:

```bash
npx expo start
```

**Setelah server berjalan, Anda akan melihat:**
- QR code di terminal
- Menu dengan opsi platform

**Pilih platform untuk menjalankan:**

#### Opsi 1: Web Browser (Paling Mudah)
Tekan `w` di terminal atau jalankan:
```bash
npm run web
```
Aplikasi akan terbuka di browser di `http://localhost:8081`

#### Opsi 2: Expo Go (Android/iOS)
1. Install **Expo Go** di smartphone:
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Pastikan smartphone dan komputer dalam WiFi yang sama
3. Scan QR code yang muncul di terminal dengan Expo Go
4. Tunggu aplikasi dimuat

#### Opsi 3: Android Emulator
```bash
npm run android
```
**Catatan:** Perlu Android Studio dan emulator yang sudah dikonfigurasi

#### Opsi 4: iOS Simulator (macOS saja)
```bash
npm run ios
```
**Catatan:** Perlu Xcode dan iOS Simulator yang sudah dikonfigurasi

## 🚀 Quick Start (Jika Sudah Terinstall)

Jika semua sudah terinstall, Anda bisa langsung:

```bash
# Install dependencies (jika belum)
npm install

# Jalankan aplikasi
npm start

# Atau langsung ke platform tertentu
npm run web      # Web browser
npm run android  # Android emulator
npm run ios      # iOS simulator (macOS)
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

### Masalah Umum

#### "node: command not found"
- Pastikan Node.js sudah terinstal
- Restart terminal setelah instalasi
- Verifikasi dengan `node --version`

#### "npm: command not found"
- Node.js biasanya sudah include npm
- Jika masih error: `npm install -g npm`

#### "expo: command not found"
- Instal Expo CLI: `npm install -g expo-cli`
- Atau gunakan: `npx expo start` (tanpa instalasi global)

#### Port sudah digunakan (EADDRINUSE)
- Tutup aplikasi yang menggunakan port 8081
- Atau gunakan port lain: `npx expo start --port 8082`

#### Metro bundler error
- Hapus cache: `npx expo start --clear`
- Hapus node_modules dan install ulang:
  ```bash
  rm -rf node_modules
  npm install
  ```

#### Aplikasi tidak muncul di Expo Go
- Pastikan smartphone dan komputer dalam WiFi yang sama
- Gunakan tunnel mode: `npx expo start --tunnel`
- Restart Expo Go dan scan QR code lagi

**Untuk troubleshooting lebih lengkap**, lihat [PANDUAN_INSTALASI.md](./PANDUAN_INSTALASI.md#-troubleshooting)

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
