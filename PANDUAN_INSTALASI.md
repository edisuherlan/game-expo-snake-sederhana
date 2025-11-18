# 📱 Panduan Instalasi Game Snake - Expo & React Native

Panduan lengkap untuk menginstal dan menjalankan game Snake dari awal hingga selesai.

## 📋 Daftar Isi

1. [Persyaratan Sistem](#persyaratan-sistem)
2. [Instalasi Node.js dan npm](#instalasi-nodejs-dan-npm)
3. [Instalasi Expo CLI](#instalasi-expo-cli)
4. [Membuat Proyek Baru](#membuat-proyek-baru)
5. [Menambahkan Game Snake](#menambahkan-game-snake)
6. [Menjalankan Aplikasi](#menjalankan-aplikasi)
7. [Troubleshooting](#troubleshooting)

---

## 🖥️ Persyaratan Sistem

Sebelum memulai, pastikan komputer Anda memenuhi persyaratan berikut:

### Windows
- Windows 10 atau lebih baru
- RAM minimal 4GB (disarankan 8GB)
- Ruang disk minimal 2GB

### macOS
- macOS 10.15 (Catalina) atau lebih baru
- RAM minimal 4GB (disarankan 8GB)
- Ruang disk minimal 2GB

### Linux
- Ubuntu 18.04 atau distribusi Linux modern lainnya
- RAM minimal 4GB (disarankan 8GB)
- Ruang disk minimal 2GB

---

## 📦 Instalasi Node.js dan npm

### Langkah 1: Unduh Node.js

1. Kunjungi website resmi Node.js: https://nodejs.org/
2. Unduh versi **LTS (Long Term Support)** yang direkomendasikan
   - Versi terbaru saat ini: Node.js 20.x atau lebih baru
3. Pilih installer sesuai sistem operasi Anda:
   - Windows: `.msi` installer
   - macOS: `.pkg` installer
   - Linux: gunakan package manager (apt, yum, dll)

### Langkah 2: Instal Node.js

**Windows:**
1. Jalankan file `.msi` yang sudah diunduh
2. Ikuti wizard instalasi (klik Next/Next/Install)
3. Pastikan opsi "Add to PATH" dicentang
4. Klik Finish setelah instalasi selesai

**macOS:**
1. Jalankan file `.pkg` yang sudah diunduh
2. Ikuti wizard instalasi
3. Masukkan password administrator jika diminta

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Atau menggunakan snap
sudo snap install node --classic
```

### Langkah 3: Verifikasi Instalasi

Buka **Command Prompt** (Windows) atau **Terminal** (macOS/Linux) dan jalankan:

```bash
node --version
npm --version
```

Anda harus melihat versi Node.js dan npm, contoh:
```
v20.10.0
10.2.3
```

✅ **Jika berhasil**, lanjut ke langkah berikutnya!

❌ **Jika error**, pastikan:
- Node.js sudah terinstal dengan benar
- Terminal/Command Prompt dibuka ulang setelah instalasi
- Path environment variable sudah diset dengan benar

---

## 🚀 Instalasi Expo CLI

### Langkah 1: Instal Expo CLI Secara Global

Buka terminal/command prompt dan jalankan:

```bash
npm install -g expo-cli
```

**Catatan:** Di beberapa sistem, Anda mungkin perlu menggunakan `sudo` (macOS/Linux):
```bash
sudo npm install -g expo-cli
```

### Langkah 2: Verifikasi Instalasi

```bash
expo --version
```

Anda harus melihat versi Expo CLI, contoh:
```
12.0.0
```

✅ **Jika berhasil**, lanjut ke langkah berikutnya!

---

## 📁 Membuat Proyek Baru

### Langkah 1: Buat Folder Proyek

Buat folder baru untuk proyek Anda:

**Windows:**
```powershell
mkdir "E:\MOBILE APP\EXPO\game"
cd "E:\MOBILE APP\EXPO\game"
```

**macOS/Linux:**
```bash
mkdir -p ~/Projects/expo-game
cd ~/Projects/expo-game
```

### Langkah 2: Buat Proyek Expo

Jalankan perintah berikut untuk membuat proyek Expo baru:

```bash
npx create-expo-app@latest . --yes
```

**Penjelasan:**
- `npx create-expo-app@latest` - Membuat proyek Expo terbaru
- `.` - Membuat proyek di folder saat ini
- `--yes` - Menggunakan template default tanpa konfirmasi

**Proses ini akan:**
- Mengunduh template Expo
- Menginstal semua dependensi yang diperlukan
- Membuat struktur folder dasar

⏳ **Tunggu hingga proses selesai** (biasanya 2-5 menit)

### Langkah 3: Verifikasi Struktur Proyek

Setelah instalasi selesai, pastikan struktur folder seperti ini:

```
game/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── explore.tsx
│   ├── _layout.tsx
│   └── modal.tsx
├── components/
├── assets/
├── package.json
├── app.json
└── tsconfig.json
```

✅ **Jika struktur folder sudah benar**, lanjut ke langkah berikutnya!

---

## 🐍 Menambahkan Game Snake

### Langkah 1: Buat File Game Snake

Buat file baru di folder `components` dengan nama `snake-game.tsx`:

**Windows (PowerShell):**
```powershell
New-Item -Path "components\snake-game.tsx" -ItemType File
```

**macOS/Linux:**
```bash
touch components/snake-game.tsx
```

### Langkah 2: Salin Kode Game Snake

Salin seluruh isi file `components/snake-game.tsx` dari proyek ini ke file yang baru dibuat.

**Atau** jika Anda mengikuti tutorial ini, buat file dengan kode berikut (lihat file `components/snake-game.tsx` di proyek ini).

### Langkah 3: Update Halaman Utama

Buka file `app/(tabs)/index.tsx` dan ganti isinya dengan:

```typescript
import { StyleSheet, View } from 'react-native';
import SnakeGame from '@/components/snake-game';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SnakeGame />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Langkah 4: Verifikasi Instalasi Dependensi

Pastikan semua dependensi sudah terinstal:

```bash
npm install
```

✅ **Jika tidak ada error**, game Snake sudah siap digunakan!

---

## ▶️ Menjalankan Aplikasi

### Opsi 1: Menjalankan di Web Browser (Paling Mudah)

```bash
npm run web
```

Aplikasi akan terbuka di browser secara otomatis di `http://localhost:8081`

### Opsi 2: Menjalankan dengan Expo Go (Android/iOS)

**Langkah 1:** Jalankan development server
```bash
npm start
```
atau
```bash
npx expo start
```

**Langkah 2:** Install Expo Go di smartphone Anda
- **Android:** [Download dari Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS:** [Download dari App Store](https://apps.apple.com/app/expo-go/id982107779)

**Langkah 3:** Scan QR Code
- Buka aplikasi Expo Go
- Scan QR code yang muncul di terminal/browser
- Tunggu aplikasi dimuat

### Opsi 3: Menjalankan di Android Emulator

**Persyaratan:**
- Android Studio sudah terinstal
- Android Emulator sudah dikonfigurasi

**Langkah:**
```bash
npm run android
```

### Opsi 4: Menjalankan di iOS Simulator (macOS saja)

**Persyaratan:**
- macOS dengan Xcode terinstal
- iOS Simulator sudah dikonfigurasi

**Langkah:**
```bash
npm run ios
```

---

## 🔧 Troubleshooting

### Masalah: "node: command not found"

**Solusi:**
1. Pastikan Node.js sudah terinstal
2. Restart terminal/command prompt
3. Verifikasi dengan `node --version`

### Masalah: "npm: command not found"

**Solusi:**
1. Node.js biasanya sudah include npm
2. Jika masih error, instal npm secara terpisah:
   ```bash
   npm install -g npm
   ```

### Masalah: "expo: command not found"

**Solusi:**
1. Instal Expo CLI secara global:
   ```bash
   npm install -g expo-cli
   ```
2. Atau gunakan npx tanpa instalasi global:
   ```bash
   npx expo start
   ```

### Masalah: Port sudah digunakan

**Error:** `Error: listen EADDRINUSE: address already in use :8081`

**Solusi:**
1. Tutup aplikasi yang menggunakan port 8081
2. Atau gunakan port lain:
   ```bash
   npx expo start --port 8082
   ```

### Masalah: Metro bundler tidak berjalan

**Solusi:**
1. Hapus cache:
   ```bash
   npx expo start --clear
   ```
2. Hapus node_modules dan instal ulang:
   ```bash
   rm -rf node_modules
   npm install
   ```

### Masalah: Aplikasi tidak muncul di Expo Go

**Solusi:**
1. Pastikan smartphone dan komputer dalam jaringan WiFi yang sama
2. Coba gunakan tunnel mode:
   ```bash
   npx expo start --tunnel
   ```
3. Restart Expo Go dan scan QR code lagi

### Masalah: Error saat build/compile

**Solusi:**
1. Pastikan semua dependensi terinstal:
   ```bash
   npm install
   ```
2. Hapus cache:
   ```bash
   npx expo start --clear
   ```
3. Periksa versi Node.js (harus 18.x atau lebih baru)

---

## 📚 Langkah Selanjutnya

Setelah aplikasi berjalan dengan sukses:

1. **Pelajari Kode:** Baca file `components/snake-game.tsx` untuk memahami cara kerjanya
2. **Baca Tutorial:** Lihat file `GAME_TUTORIAL.md` untuk penjelasan konsep-konsep yang digunakan
3. **Eksperimen:** Coba ubah nilai seperti `GAME_SPEED` atau `GRID_SIZE`
4. **Kembangkan:** Tambahkan fitur baru seperti pause button atau high score

---

## 🆘 Butuh Bantuan?

Jika mengalami masalah yang tidak tercantum di sini:

1. **Cek Dokumentasi Resmi:**
   - [Expo Documentation](https://docs.expo.dev/)
   - [React Native Documentation](https://reactnative.dev/docs/getting-started)

2. **Komunitas:**
   - [Expo Discord](https://chat.expo.dev/)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

3. **GitHub Issues:**
   - [Expo GitHub](https://github.com/expo/expo/issues)

---

## ✅ Checklist Instalasi

Gunakan checklist ini untuk memastikan semua langkah sudah dilakukan:

- [ ] Node.js terinstal dan terverifikasi
- [ ] npm terinstal dan terverifikasi
- [ ] Expo CLI terinstal dan terverifikasi
- [ ] Proyek Expo berhasil dibuat
- [ ] File `snake-game.tsx` sudah dibuat
- [ ] File `index.tsx` sudah diupdate
- [ ] Dependensi terinstal (`npm install`)
- [ ] Aplikasi berhasil dijalankan
- [ ] Game Snake muncul dan bisa dimainkan

**Selamat! 🎉 Anda sudah berhasil menginstal dan menjalankan game Snake!**

---

**Terakhir Diperbarui:** Desember 2024  
**Versi Expo:** 54.0.24  
**Versi Node.js yang Disarankan:** 20.x atau lebih baru

