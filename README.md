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

## 📁 Struktur File dan Halaman

### Struktur Folder Project

```
game/
├── app/                    # Folder routing aplikasi (Expo Router)
│   ├── _layout.tsx        # Layout utama aplikasi
│   ├── (tabs)/            # Folder untuk tab navigation
│   │   ├── _layout.tsx   # Layout untuk tab navigation
│   │   ├── index.tsx     # Halaman Home (menampilkan game Snake)
│   │   └── explore.tsx   # Halaman Explore (tidak digunakan untuk game)
│   └── modal.tsx         # Halaman modal (tidak digunakan untuk game)
├── components/            # Komponen React yang dapat digunakan kembali
│   ├── snake-game.tsx    # ⭐ Komponen utama game Snake
│   ├── themed-text.tsx   # Komponen teks dengan tema
│   ├── themed-view.tsx   # Komponen view dengan tema
│   └── ui/               # Komponen UI tambahan
├── assets/               # File aset (gambar, icon, dll)
│   └── images/          # Gambar dan icon aplikasi
├── constants/           # Konstanta dan konfigurasi
│   └── theme.ts         # Konfigurasi tema aplikasi
├── hooks/               # Custom React hooks
│   ├── use-color-scheme.ts    # Hook untuk deteksi tema (dark/light)
│   └── use-theme-color.ts     # Hook untuk mendapatkan warna tema
├── scripts/             # Script utilitas
│   └── reset-project.js # Script untuk reset project
├── app.json             # Konfigurasi Expo
├── package.json         # Dependencies dan scripts npm
├── tsconfig.json        # Konfigurasi TypeScript
└── README.md            # Dokumentasi utama
```

### File-File Penting untuk Game Snake

#### 🎮 File Game (Core)

**`components/snake-game.tsx`** ⭐ **FILE UTAMA GAME**
- **Fungsi:** Komponen utama yang berisi seluruh logika game Snake
- **Fitur:**
  - State management untuk ular, makanan, skor, dan status game
  - Game loop menggunakan `useEffect` dan `setInterval`
  - Touch handling dengan `PanResponder` untuk swipe gesture
  - Collision detection (tabrakan dengan dinding dan tubuh sendiri)
  - Render grid dan UI game
- **Teknologi:** React Hooks (useState, useEffect, useRef), PanResponder
- **Baris kode:** ~400 baris

#### 📱 File Halaman (Pages)

**`app/_layout.tsx`** - **Root Layout**
- **Fungsi:** Layout utama aplikasi yang membungkus semua halaman
- **Fitur:**
  - Mengatur tema aplikasi (dark/light mode)
  - Mengatur Stack navigation
  - Menampilkan StatusBar
- **Teknologi:** Expo Router, React Navigation

**`app/(tabs)/_layout.tsx`** - **Tab Layout**
- **Fungsi:** Mengatur tab navigation di bagian bawah layar
- **Fitur:**
  - Mengatur tab Home dan Explore
  - Mengatur icon dan warna tab
- **Teknologi:** Expo Router Tabs

**`app/(tabs)/index.tsx`** ⭐ **HALAMAN UTAMA (Home)**
- **Fungsi:** Halaman utama yang menampilkan game Snake
- **Fitur:**
  - Mengimport dan menampilkan komponen `SnakeGame`
  - Mengatur container untuk game
- **Baris kode:** ~17 baris
- **Route:** `/` atau tab "Home"

**`app/(tabs)/explore.tsx`** - **Halaman Explore**
- **Fungsi:** Halaman kedua di tab navigation (tidak digunakan untuk game)
- **Status:** File default dari template Expo, bisa dihapus atau diubah

**`app/modal.tsx`** - **Halaman Modal**
- **Fungsi:** Halaman modal (tidak digunakan untuk game)
- **Status:** File default dari template Expo, bisa dihapus atau diubah

#### ⚙️ File Konfigurasi

**`app.json`** - **Konfigurasi Expo**
- **Fungsi:** Konfigurasi aplikasi Expo
- **Isi:**
  - Nama aplikasi: "game"
  - Versi: "1.0.0"
  - Icon dan splash screen
  - Konfigurasi untuk iOS, Android, dan Web
  - Plugin Expo yang digunakan

**`package.json`** - **Dependencies**
- **Fungsi:** Mendefinisikan dependencies dan scripts npm
- **Isi:**
  - Dependencies utama: expo, react, react-native
  - Dependencies game: react-native-gesture-handler, react-native-reanimated
  - Scripts: start, android, ios, web, lint

**`tsconfig.json`** - **Konfigurasi TypeScript**
- **Fungsi:** Konfigurasi compiler TypeScript
- **Isi:**
  - Path alias (`@/*` untuk root directory)
  - Strict mode enabled
  - Include patterns untuk file TypeScript

#### 🎨 File Komponen Pendukung

**`components/themed-text.tsx`** - **Komponen Teks Bertema**
- **Fungsi:** Komponen Text yang otomatis menyesuaikan tema
- **Penggunaan:** Digunakan untuk teks yang mendukung dark/light mode

**`components/themed-view.tsx`** - **Komponen View Bertema**
- **Fungsi:** Komponen View yang otomatis menyesuaikan tema
- **Penggunaan:** Digunakan untuk container yang mendukung dark/light mode

**`constants/theme.ts`** - **Konfigurasi Tema**
- **Fungsi:** Mendefinisikan warna dan tema aplikasi
- **Isi:** Warna untuk light mode dan dark mode

**`hooks/use-color-scheme.ts`** - **Hook Tema**
- **Fungsi:** Hook untuk mendeteksi tema sistem (dark/light)
- **Penggunaan:** Digunakan di layout untuk mengatur tema

#### 📚 File Dokumentasi

**`README.md`** ⭐ - **Dokumentasi Utama**
- **Fungsi:** Dokumentasi lengkap project
- **Isi:** Instalasi, penggunaan, troubleshooting

**`PANDUAN_INSTALASI.md`** - **Panduan Instalasi Lengkap**
- **Fungsi:** Panduan step-by-step instalasi dari awal
- **Isi:** Instalasi Node.js, Expo CLI, dependencies, dll

**`GAME_TUTORIAL.md`** - **Tutorial Belajar**
- **Fungsi:** Penjelasan konsep-konsep yang digunakan dalam game
- **Isi:** State management, game loop, touch handling, dll

**`DOCUMENTATION.md`** - **Indeks Dokumentasi**
- **Fungsi:** Peta navigasi untuk semua dokumentasi
- **Isi:** Link ke semua file dokumentasi

### Halaman yang Digunakan dalam Game

#### 1. **Halaman Home** (`/` atau tab "Home")
- **File:** `app/(tabs)/index.tsx`
- **Fungsi:** Menampilkan game Snake
- **Komponen:** Menggunakan `SnakeGame` dari `components/snake-game.tsx`
- **Akses:** Tab pertama di aplikasi atau route `/`

#### 2. **Halaman Explore** (`/explore`)
- **File:** `app/(tabs)/explore.tsx`
- **Fungsi:** Halaman kedua di tab navigation
- **Status:** Tidak digunakan untuk game (file default template)

### Alur Aplikasi

```
1. Aplikasi dimulai
   ↓
2. app/_layout.tsx (Root Layout)
   - Mengatur tema
   - Mengatur Stack navigation
   ↓
3. app/(tabs)/_layout.tsx (Tab Layout)
   - Mengatur tab navigation
   ↓
4. app/(tabs)/index.tsx (Halaman Home)
   - Menampilkan komponen SnakeGame
   ↓
5. components/snake-game.tsx
   - Render game Snake
   - Handle game logic
   - Handle user input
```

### File yang Wajib untuk Game Snake

**Minimal yang diperlukan:**
1. ✅ `components/snake-game.tsx` - Komponen game
2. ✅ `app/(tabs)/index.tsx` - Halaman yang menampilkan game
3. ✅ `app/_layout.tsx` - Root layout
4. ✅ `app/(tabs)/_layout.tsx` - Tab layout
5. ✅ `package.json` - Dependencies
6. ✅ `app.json` - Konfigurasi Expo

**File pendukung (opsional tapi disarankan):**
- `constants/theme.ts` - Untuk tema
- `hooks/use-color-scheme.ts` - Untuk dark/light mode
- `components/themed-*.tsx` - Untuk komponen bertema

### Cara File Bekerja Bersama

1. **Routing:** Expo Router menggunakan struktur folder `app/` untuk routing
   - `app/(tabs)/index.tsx` → Route `/` atau tab "Home"
   - `app/(tabs)/explore.tsx` → Route `/explore` atau tab "Explore"

2. **Komponen:** File di folder `components/` adalah komponen yang bisa digunakan di mana saja
   - `SnakeGame` diimport di `index.tsx` untuk ditampilkan

3. **State Management:** Game menggunakan React Hooks
   - `useState` untuk state game
   - `useEffect` untuk game loop
   - `useRef` untuk menyimpan nilai yang tidak trigger re-render

4. **Styling:** Menggunakan StyleSheet dari React Native
   - Setiap komponen memiliki styles sendiri
   - Bisa menggunakan tema dari `constants/theme.ts`

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
