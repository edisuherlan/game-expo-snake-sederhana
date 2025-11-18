# 🐍 Tutorial Game Snake - Belajar React Native & Expo

Selamat! Anda sekarang punya game Snake sederhana yang bisa dipelajari. File ini menjelaskan konsep-konsep penting yang digunakan dalam game ini.

## 📚 Konsep yang Dipelajari

### 1. **State Management dengan useState**
```typescript
const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
const [score, setScore] = useState(0);
```
- `useState` digunakan untuk menyimpan data yang bisa berubah
- Setiap perubahan state akan membuat komponen re-render
- Dalam game ini, kita menyimpan: posisi ular, makanan, skor, dan status permainan

### 2. **Game Loop dengan useEffect**
```typescript
useEffect(() => {
  const gameInterval = setInterval(() => {
    // Update game setiap GAME_SPEED ms
  }, GAME_SPEED);
  
  return () => clearInterval(gameInterval); // Cleanup
}, [dependencies]);
```
- `useEffect` digunakan untuk menjalankan efek samping (side effects)
- `setInterval` membuat game loop yang berjalan terus menerus
- Cleanup function (`clearInterval`) penting untuk mencegah memory leak

### 3. **Touch Handling dengan PanResponder**
```typescript
const panResponder = PanResponder.create({
  onPanResponderRelease: (evt, gestureState) => {
    // Deteksi swipe gesture
  }
});
```
- `PanResponder` digunakan untuk menangani gesture seperti swipe
- Bisa mendeteksi arah gerakan (atas, bawah, kiri, kanan)
- Alternatif: bisa juga menggunakan tombol untuk kontrol

### 4. **Ref untuk Menyimpan Nilai yang Tidak Trigger Re-render**
```typescript
const nextDirectionRef = useRef<Position>(INITIAL_DIRECTION);
```
- `useRef` menyimpan nilai yang tidak menyebabkan re-render saat berubah
- Berguna untuk menyimpan nilai yang perlu diakses di game loop
- Mencegah bug di mana direction berubah terlalu cepat

### 5. **Array Manipulation**
```typescript
const newSnake = [newHead, ...prevSnake]; // Tambah kepala baru
newSnake.pop(); // Hapus ekor
```
- Spread operator (`...`) untuk menambahkan elemen baru
- `pop()` untuk menghapus elemen terakhir
- Array manipulation penting untuk membuat snake bergerak

### 6. **Conditional Rendering**
```typescript
{gameOver && <Text>Permainan Selesai!</Text>}
{isRunning && <View>Kontrol</View>}
```
- Menampilkan elemen berdasarkan kondisi
- Menggunakan operator `&&` untuk conditional rendering

## 🎮 Cara Bermain

1. **Mulai Permainan**: Tekan tombol "Mulai Permainan"
2. **Kontrol**: 
   - Geser (swipe) di area permainan untuk mengubah arah
   - Atau gunakan tombol panah di bawah
3. **Tujuan**: Makan makanan merah untuk menambah skor dan panjang ular
4. **Permainan Selesai**: Jika ular menabrak dinding atau tubuh sendiri

## 🔧 Konsep Game Development

### Game Loop
Permainan berjalan dalam loop yang terus menerus:
1. Perbarui posisi ular
2. Cek tabrakan (collision)
3. Cek apakah memakan makanan
4. Render ulang tampilan
5. Ulangi

### Collision Detection
```typescript
// Cek tabrakan dengan dinding
if (head.x < 0 || head.x >= GRID_SIZE) return true;

// Cek tabrakan dengan tubuh sendiri
for (let segment of body) {
  if (head.x === segment.x && head.y === segment.y) return true;
}
```

### Grid System
Permainan menggunakan grid 20x20:
- Setiap sel memiliki koordinat (x, y)
- Ular dan makanan ditempatkan di sel tertentu
- Memudahkan perhitungan posisi dan tabrakan

## 🚀 Ide untuk Dikembangkan Lebih Lanjut

1. **Tingkat Kesulitan**: Tambah level yang meningkatkan kecepatan permainan
2. **Skor Tertinggi**: Simpan skor tertinggi menggunakan AsyncStorage
3. **Peningkatan Kekuatan**: Tambah item khusus yang memberikan efek tertentu
4. **Multi Pemain**: Buat mode 2 pemain
5. **Animasi**: Tambah animasi halus untuk pergerakan ular
6. **Efek Suara**: Tambah suara saat memakan makanan atau permainan selesai
7. **Fitur Jeda**: Tambah tombol jeda
8. **Rintangan**: Tambah rintangan di arena

## 📖 Belajar Lebih Lanjut

- **React Hooks**: Pelajari lebih dalam tentang useState, useEffect, useRef
- **React Native Gestures**: Pelajari tentang PanResponder dan gesture lainnya
- **Pengembangan Game**: Pelajari konsep game loop, deteksi tabrakan, dll
- **TypeScript**: Pelajari type safety untuk membuat kode lebih kuat

## 💡 Tips untuk Pemula

1. **Baca Kode**: Baca setiap baris kode dan pahami fungsinya
2. **Ubah Nilai**: Coba ubah `GAME_SPEED`, `GRID_SIZE` untuk melihat efeknya
3. **Tambahkan Fitur**: Mulai dengan fitur sederhana seperti tombol jeda
4. **Debug**: Gunakan `console.log()` untuk melihat nilai variabel
5. **Pecah Masalah**: Pecah masalah besar menjadi masalah kecil

Selamat belajar! 🎉

