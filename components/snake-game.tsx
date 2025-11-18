/**
 * ============================================
 * GAME SNAKE - Komponen Utama
 * ============================================
 * 
 * File ini berisi seluruh logika dan UI untuk game Snake.
 * 
 * FITUR UTAMA:
 * - Game loop dengan useEffect dan setInterval
 * - Touch handling dengan PanResponder untuk swipe gesture
 * - Collision detection (tabrakan dengan dinding dan tubuh sendiri)
 * - State management dengan React Hooks
 * - Render grid 20x20 dengan snake dan makanan
 * 
 * CARA UPDATE:
 * - Ubah GRID_SIZE untuk mengubah ukuran arena
 * - Ubah GAME_SPEED untuk mengubah kecepatan game (semakin kecil = semakin cepat)
 * - Ubah warna di styles untuk mengubah tema
 * - Tambah fitur baru di fungsi-fungsi yang sudah ada
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

// ============================================
// KONSTANTA GAME
// ============================================

/**
 * Ukuran grid permainan (20x20 = 400 sel)
 * TIP: Ubah nilai ini untuk membuat arena lebih besar/kecil
 *      Nilai lebih besar = arena lebih besar, tapi lebih lambat
 */
const GRID_SIZE = 20;

/**
 * Ukuran setiap sel dalam pixel
 * Dihitung berdasarkan lebar layar dibagi jumlah grid
 * TIP: Nilai ini otomatis menyesuaikan dengan ukuran layar
 */
const CELL_SIZE = Dimensions.get('window').width / GRID_SIZE;

/**
 * Posisi awal ular saat game dimulai
 * Format: Array of {x, y} coordinates
 * TIP: Ubah nilai ini untuk mengubah posisi start ular
 */
const INITIAL_SNAKE = [{ x: 10, y: 10 }];

/**
 * Arah awal pergerakan ular
 * {x: 1, y: 0} = ke kanan
 * {x: -1, y: 0} = ke kiri
 * {x: 0, y: 1} = ke bawah
 * {x: 0, y: -1} = ke atas
 * TIP: Ubah nilai ini untuk mengubah arah start
 */
const INITIAL_DIRECTION = { x: 1, y: 0 };

/**
 * Kecepatan permainan dalam milidetik
 * Semakin kecil nilai = semakin cepat game
 * TIP: 
 * - 100ms = sangat cepat (sulit)
 * - 150ms = sedang (disarankan)
 * - 200ms = lambat (mudah)
 * - Bisa dibuat dinamis berdasarkan level
 */
const GAME_SPEED = 150;

// ============================================
// TIPE DATA
// ============================================

/**
 * Tipe data untuk posisi di grid
 * x: koordinat horizontal (0 sampai GRID_SIZE-1)
 * y: koordinat vertikal (0 sampai GRID_SIZE-1)
 */
type Position = { x: number; y: number };

/**
 * ============================================
 * KOMPONEN UTAMA SNAKE GAME
 * ============================================
 */
export default function SnakeGame() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  /**
   * State untuk menyimpan posisi ular
   * Format: Array of Position, index 0 = kepala, index terakhir = ekor
   * Contoh: [{x:10,y:10}, {x:9,y:10}, {x:8,y:10}]
   * TIP: Array ini akan bertambah panjang saat ular makan makanan
   */
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  
  /**
   * State untuk menyimpan posisi makanan
   * Format: Single Position {x, y}
   * TIP: Posisi ini akan berubah setiap kali ular memakan makanan
   */
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  
  /**
   * State untuk menyimpan arah pergerakan saat ini
   * Format: Position {x, y} dengan nilai -1, 0, atau 1
   * TIP: Digunakan untuk menentukan arah pergerakan ular
   */
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  
  /**
   * State untuk menyimpan skor pemain
   * Format: Number (integer)
   * TIP: Skor bertambah +10 setiap kali makan makanan
   *      Bisa diubah untuk sistem skor yang berbeda
   */
  const [score, setScore] = useState(0);
  
  /**
   * State untuk menandai apakah game sudah selesai
   * Format: Boolean
   * true = game over (ular menabrak dinding atau tubuh sendiri)
   * false = game masih berjalan
   */
  const [gameOver, setGameOver] = useState(false);
  
  /**
   * State untuk menandai apakah game sedang berjalan
   * Format: Boolean
   * true = game loop aktif, ular bergerak
   * false = game paused atau belum dimulai
   * TIP: Bisa digunakan untuk fitur pause di masa depan
   */
  const [isRunning, setIsRunning] = useState(false);
  
  /**
   * Ref untuk menyimpan arah berikutnya
   * Mengapa pakai ref? Karena kita perlu akses nilai terbaru di dalam setInterval
   * tanpa trigger re-render. Ini mencegah bug di mana direction berubah terlalu cepat.
   * TIP: Ref tidak menyebabkan re-render saat berubah, cocok untuk nilai yang
   *      perlu diakses di game loop
   */
  const nextDirectionRef = useRef<Position>(INITIAL_DIRECTION);

  // ============================================
  // FUNGSI UTILITAS
  // ============================================
  
  /**
   * Fungsi untuk membuat makanan di posisi acak
   * 
   * @returns {Position} Posisi makanan yang valid (tidak di tubuh ular)
   * 
   * CARA KERJA:
   * 1. Generate posisi acak dalam grid
   * 2. Cek apakah posisi tersebut ada di tubuh ular
   * 3. Jika ada, generate ulang (recursive)
   * 4. Return posisi yang valid
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan logika untuk menghindari posisi tertentu
   * - Bisa dibuat makanan khusus dengan warna berbeda
   * - Bisa ditambahkan multiple makanan sekaligus
   */
  const generateFood = (): Position => {
    // Generate posisi acak dalam batas grid
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    
    // Cek apakah makanan muncul di tubuh ular
    // Menggunakan some() untuk mengecek apakah ada segment yang sama posisinya
    const isOnSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
    
    // Jika makanan muncul di tubuh ular, generate ulang
    // Recursive call sampai dapat posisi yang valid
    if (isOnSnake) {
      return generateFood(); // Buat ulang jika ada di ular
    }
    
    return newFood;
  };

  /**
   * Fungsi untuk memeriksa apakah terjadi tabrakan
   * 
   * @param {Position} head - Posisi kepala ular yang akan dicek
   * @param {Position[]} body - Array posisi seluruh tubuh ular
   * @returns {boolean} true jika terjadi tabrakan, false jika aman
   * 
   * JENIS TABRAKAN YANG DICEK:
   * 1. Tabrakan dengan dinding (keluar dari batas grid)
   * 2. Tabrakan dengan tubuh sendiri (kepala menyentuh tubuh)
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan tabrakan dengan obstacle/rintangan
   * - Bisa dibuat mode "wrap around" (ular muncul di sisi lain saat keluar)
   * - Bisa ditambahkan tabrakan dengan musuh (untuk mode multiplayer)
   */
  const checkCollision = (head: Position, body: Position[]): boolean => {
    // CEK TABRAKAN DENGAN DINDING
    // Jika kepala keluar dari batas grid (x atau y < 0 atau >= GRID_SIZE)
    // maka terjadi tabrakan dengan dinding
    if (
      head.x < 0 ||                    // Keluar kiri
      head.x >= GRID_SIZE ||           // Keluar kanan
      head.y < 0 ||                    // Keluar atas
      head.y >= GRID_SIZE              // Keluar bawah
    ) {
      return true; // Tabrakan dengan dinding!
    }
    
    // CEK TABRAKAN DENGAN TUBUH SENDIRI
    // Loop mulai dari index 1 (skip kepala di index 0)
    // Cek apakah posisi kepala sama dengan posisi segment tubuh manapun
    for (let i = 1; i < body.length; i++) {
      if (head.x === body[i].x && head.y === body[i].y) {
        return true; // Tabrakan dengan tubuh sendiri!
      }
    }
    
    // Tidak ada tabrakan, aman untuk bergerak
    return false;
  };

  // ============================================
  // GAME LOOP - Inti dari permainan
  // ============================================
  
  /**
   * useEffect untuk menjalankan game loop
   * 
   * CARA KERJA:
   * 1. Mengecek apakah game sedang berjalan dan belum game over
   * 2. Membuat interval yang berjalan setiap GAME_SPEED ms
   * 3. Di setiap interval:
   *    - Update posisi kepala ular berdasarkan arah
   *    - Cek tabrakan
   *    - Cek apakah makan makanan
   *    - Update state ular
   * 4. Cleanup interval saat component unmount atau game berhenti
   * 
   * DEPENDENCIES:
   * - isRunning: Game loop hanya jalan jika isRunning = true
   * - gameOver: Game loop berhenti jika gameOver = true
   * - food: Perlu di-dependency karena digunakan di dalam loop
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan pause functionality dengan toggle isRunning
   * - Bisa dibuat kecepatan dinamis berdasarkan level
   * - Bisa ditambahkan animasi smooth dengan interpolasi
   */
  useEffect(() => {
    // Jangan jalankan game loop jika game belum dimulai atau sudah game over
    if (!isRunning || gameOver) return;

    // Buat interval yang akan berjalan setiap GAME_SPEED milidetik
    const gameInterval = setInterval(() => {
      // Update state snake menggunakan functional update
      // Menggunakan functional update untuk akses nilai terbaru dari prevSnake
      setSnake((prevSnake) => {
        // Ambil arah dari ref (nilai terbaru tanpa trigger re-render)
        const currentDirection = nextDirectionRef.current;
        
        // Ambil posisi kepala saat ini (index 0 dari array snake)
        const head = prevSnake[0];
        
        // Hitung posisi kepala baru berdasarkan arah saat ini
        // Contoh: jika arah {x:1, y:0} dan kepala di {x:10, y:10}
        //          maka kepala baru di {x:11, y:10}
        const newHead: Position = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
        };

        // CEK TABRAKAN
        // Jika terjadi tabrakan, stop game dan return snake yang lama
        if (checkCollision(newHead, prevSnake)) {
          setGameOver(true);      // Set game over
          setIsRunning(false);     // Stop game loop
          return prevSnake;        // Return snake lama (tidak update)
        }

        // BUAT ULAR BARU DENGAN KEPALA BARU
        // Spread operator untuk menambahkan kepala baru di depan array
        // Contoh: [newHead, ...prevSnake] = [{x:11,y:10}, {x:10,y:10}, {x:9,y:10}]
        const newSnake = [newHead, ...prevSnake];

        // CEK APAKAH ULAR MEMAKAN MAKANAN
        // Bandingkan posisi kepala baru dengan posisi makanan
        if (newHead.x === food.x && newHead.y === food.y) {
          // ULAR MEMAKAN MAKANAN
          
          // Tambah skor (bisa diubah nilai +10 sesuai kebutuhan)
          setScore((prev) => prev + 10);
          
          // Generate makanan baru di posisi acak
          setFood(generateFood());
          
          // Return ular baru tanpa menghapus ekor
          // Ini membuat ular bertambah panjang
          return newSnake;
        } else {
          // ULAR TIDAK MAKAN MAKANAN
          
          // Hapus ekor (elemen terakhir dari array)
          // Ini membuat ular tetap panjangnya saat bergerak
          newSnake.pop();
          return newSnake;
        }
      });
    }, GAME_SPEED); // Interval berjalan setiap GAME_SPEED ms

    // CLEANUP FUNCTION
    // Penting! Hapus interval saat component unmount atau dependencies berubah
    // Mencegah memory leak dan multiple intervals
    return () => clearInterval(gameInterval);
  }, [isRunning, gameOver, food]); // Dependencies: jalankan ulang jika salah satu berubah

  // ============================================
  // FUNGSI KONTROL
  // ============================================
  
  /**
   * Fungsi untuk mengubah arah pergerakan ular
   * 
   * @param {Position} newDirection - Arah baru yang diinginkan
   * 
   * CARA KERJA:
   * 1. Cek apakah arah baru berlawanan dengan arah saat ini
   * 2. Jika tidak berlawanan, update direction state dan ref
   * 3. Jika berlawanan, ignore (mencegah ular bergerak mundur)
   * 
   * MENGAPA PERLU CEGAH GERAKAN BERLAWANAN?
   * - Mencegah ular langsung bergerak mundur yang menyebabkan game over instan
   * - Contoh: Jika ular bergerak ke kanan, tidak bisa langsung ke kiri
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan queue untuk arah (mengizinkan beberapa perubahan cepat)
   * - Bisa dibuat lebih responsif dengan mengurangi delay
   */
  const changeDirection = (newDirection: Position) => {
    // CEGAH GERAKAN BERLAWANAN ARAH
    // Cek apakah arah baru berlawanan dengan arah saat ini
    // Contoh: 
    // - Arah saat ini: {x:1, y:0} (kanan)
    // - Arah baru: {x:-1, y:0} (kiri) → BERLAWANAN → IGNORE
    // - Arah baru: {x:0, y:1} (bawah) → TIDAK BERLAWANAN → OK
    
    if (
      (newDirection.x === -direction.x && newDirection.x !== 0) ||  // Horizontal berlawanan
      (newDirection.y === -direction.y && newDirection.y !== 0)    // Vertikal berlawanan
    ) {
      return; // Ignore jika berlawanan arah
    }
    
    // Update ref (untuk digunakan di game loop)
    nextDirectionRef.current = newDirection;
    
    // Update state (untuk trigger re-render jika perlu)
    setDirection(newDirection);
  };

  /**
   * PanResponder untuk menangani swipe gesture
   * 
   * CARA KERJA:
   * 1. Deteksi saat user mulai swipe (onStartShouldSetPanResponder)
   * 2. Deteksi saat user menggerakkan jari (onMoveShouldSetPanResponder)
   * 3. Saat user melepas jari (onPanResponderRelease):
   *    - Hitung jarak gerakan horizontal (dx) dan vertikal (dy)
   *    - Tentukan arah berdasarkan gerakan yang lebih besar
   *    - Panggil changeDirection dengan arah yang sesuai
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan threshold minimum untuk swipe (misal: minimal 30px)
   * - Bisa dibuat lebih sensitif atau kurang sensitif
   * - Bisa ditambahkan haptic feedback saat swipe
   */
  const panResponder = useRef(
    PanResponder.create({
      // Mulai menangani gesture saat user menyentuh layar
      onStartShouldSetPanResponder: () => true,
      
      // Terus menangani gesture saat user menggerakkan jari
      onMoveShouldSetPanResponder: () => true,
      
      // Handler saat user melepas jari (swipe selesai)
      onPanResponderRelease: (evt, gestureState) => {
        // Ambil jarak gerakan horizontal dan vertikal
        const { dx, dy } = gestureState;
        
        // Hitung nilai absolut untuk menentukan gerakan dominan
        const absDx = Math.abs(dx); // Jarak horizontal (positif)
        const absDy = Math.abs(dy); // Jarak vertikal (positif)

        // Tentukan arah berdasarkan gerakan yang lebih besar
        // Jika gerakan horizontal lebih besar dari vertikal
        if (absDx > absDy) {
          // GERAKAN HORIZONTAL
          if (dx > 0) {
            // dx positif = swipe ke kanan
            changeDirection({ x: 1, y: 0 }); // Arah: Kanan
          } else {
            // dx negatif = swipe ke kiri
            changeDirection({ x: -1, y: 0 }); // Arah: Kiri
          }
        } else {
          // GERAKAN VERTIKAL
          if (dy > 0) {
            // dy positif = swipe ke bawah
            changeDirection({ x: 0, y: 1 }); // Arah: Bawah
          } else {
            // dy negatif = swipe ke atas
            changeDirection({ x: 0, y: -1 }); // Arah: Atas
          }
        }
      },
    })
  ).current;

  // ============================================
  // FUNGSI GAME CONTROL
  // ============================================
  
  /**
   * Fungsi untuk mengulangi permainan dari awal
   * 
   * CARA KERJA:
   * 1. Reset semua state ke nilai awal
   * 2. Reset ular ke posisi awal
   * 3. Reset makanan ke posisi default
   * 4. Reset skor ke 0
   * 5. Reset status game over dan mulai game
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan konfirmasi sebelum restart
   * - Bisa ditambahkan animasi transisi
   * - Bisa disimpan high score sebelum reset
   */
  const restartGame = () => {
    setSnake(INITIAL_SNAKE);                    // Reset ular ke posisi awal
    setFood({ x: 15, y: 15 });                 // Reset makanan ke posisi default
    setDirection(INITIAL_DIRECTION);            // Reset arah ke awal
    nextDirectionRef.current = INITIAL_DIRECTION; // Reset ref arah
    setScore(0);                                // Reset skor ke 0
    setGameOver(false);                         // Reset status game over
    setIsRunning(true);                         // Mulai game loop
  };

  /**
   * Fungsi untuk memulai permainan
   * 
   * CARA KERJA:
   * 1. Set isRunning ke true (mulai game loop)
   * 2. Set gameOver ke false (reset status)
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan countdown sebelum mulai
   * - Bisa ditambahkan animasi intro
   */
  const startGame = () => {
    setIsRunning(true);    // Mulai game loop
    setGameOver(false);    // Reset status game over
  };

  // ============================================
  // FUNGSI RENDER
  // ============================================
  
  /**
   * Fungsi untuk render setiap sel di grid
   * 
   * @param {number} x - Koordinat horizontal sel (0 sampai GRID_SIZE-1)
   * @param {number} y - Koordinat vertikal sel (0 sampai GRID_SIZE-1)
   * @returns {JSX.Element} Komponen View untuk sel tersebut
   * 
   * CARA KERJA:
   * 1. Cek apakah sel ini adalah kepala ular
   * 2. Cek apakah sel ini adalah tubuh ular
   * 3. Cek apakah sel ini adalah makanan
   * 4. Tentukan style berdasarkan jenis sel
   * 5. Return komponen View dengan style yang sesuai
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan animasi untuk sel
   * - Bisa dibuat efek visual khusus untuk kepala
   * - Bisa ditambahkan jenis makanan berbeda dengan warna berbeda
   */
  const renderCell = (x: number, y: number) => {
    // CEK APAKAH SEL INI ADALAH KEPALA ULAR
    // Kepala ada di index 0 dari array snake
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    
    // CEK APAKAH SEL INI ADALAH TUBUH ULAR
    // Tubuh ada di index > 0 dari array snake
    const isSnakeBody = snake.some(
      (segment, index) => segment.x === x && segment.y === y && index > 0
    );
    
    // CEK APAKAH SEL INI ADALAH MAKANAN
    const isFood = food.x === x && food.y === y;

    // TENTUKAN STYLE BERDASARKAN JENIS SEL
    // Default: sel kosong
    let cellStyle: ViewStyle | ViewStyle[] = styles.cell;
    
    // Jika kepala ular, gunakan style kepala
    if (isSnakeHead) {
      cellStyle = [styles.cell, styles.snakeHead];
    } 
    // Jika tubuh ular, gunakan style tubuh
    else if (isSnakeBody) {
      cellStyle = [styles.cell, styles.snakeBody];
    } 
    // Jika makanan, gunakan style makanan
    else if (isFood) {
      cellStyle = [styles.cell, styles.food];
    }

    // Return komponen View dengan key unik dan style yang sesuai
    // Key menggunakan format "x-y" untuk identifikasi unik
    return <View key={`${x}-${y}`} style={cellStyle} />;
  };

  // ============================================
  // RENDER UI
  // ============================================
  
  /**
   * Render komponen utama game Snake
   * 
   * STRUKTUR UI:
   * 1. Header - Menampilkan skor dan status game over
   * 2. Board - Grid permainan dengan swipe handler
   * 3. Controls - Tombol start/restart dan tombol arah
   * 4. Instructions - Petunjuk untuk pemain
   * 
   * TIP UNTUK UPDATE:
   * - Bisa ditambahkan menu settings
   * - Bisa ditambahkan high score display
   * - Bisa ditambahkan pause button
   * - Bisa dibuat UI lebih menarik dengan animasi
   */
  return (
    <View style={styles.container}>
      {/* ============================================
          HEADER - Menampilkan skor dan status
          ============================================ */}
      <View style={styles.header}>
        {/* Tampilkan skor saat ini */}
        <Text style={styles.scoreText}>Skor: {score}</Text>
        
        {/* Tampilkan "Permainan Selesai!" jika game over */}
        {gameOver && <Text style={styles.gameOverText}>Permainan Selesai!</Text>}
      </View>

      {/* ============================================
          PAPAN PERMAINAN - Grid dengan swipe handler
          ============================================ */}
      <View style={styles.board} {...panResponder.panHandlers}>
        {/* Render grid baris demi baris */}
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <View key={y} style={styles.row}>
            {/* Render setiap sel dalam baris */}
            {Array.from({ length: GRID_SIZE }).map((_, x) => renderCell(x, y))}
          </View>
        ))}
      </View>

      {/* ============================================
          TOMBOL KONTROL - Start, Restart, dan Arah
          ============================================ */}
      <View style={styles.controls}>
        {/* TOMBOL MULAI - Tampil saat game belum dimulai */}
        {!isRunning && !gameOver && (
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Mulai Permainan</Text>
          </TouchableOpacity>
        )}
        
        {/* TOMBOL ULANGI - Tampil saat game over */}
        {gameOver && (
          <TouchableOpacity style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Ulangi</Text>
          </TouchableOpacity>
        )}

        {/* TOMBOL ARAH - Tampil saat game sedang berjalan */}
        {isRunning && !gameOver && (
          <View style={styles.directionButtons}>
            {/* Baris atas: Tombol Atas */}
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => changeDirection({ x: 0, y: -1 })} // Arah: Atas
              >
                <Text style={styles.directionButtonText}>↑</Text>
              </TouchableOpacity>
            </View>
            
            {/* Baris tengah: Tombol Kiri, Spacer, Tombol Kanan */}
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => changeDirection({ x: -1, y: 0 })} // Arah: Kiri
              >
                <Text style={styles.directionButtonText}>←</Text>
              </TouchableOpacity>
              
              {/* Spacer untuk membuat tombol tengah kosong */}
              <View style={styles.directionButtonPlaceholder} />
              
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => changeDirection({ x: 1, y: 0 })} // Arah: Kanan
              >
                <Text style={styles.directionButtonText}>→</Text>
              </TouchableOpacity>
            </View>
            
            {/* Baris bawah: Tombol Bawah */}
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => changeDirection({ x: 0, y: 1 })} // Arah: Bawah
              >
                <Text style={styles.directionButtonText}>↓</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* ============================================
          PETUNJUK - Instruksi untuk pemain
          ============================================ */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          {/* Tampilkan petunjuk berbeda berdasarkan status game */}
          {isRunning
            ? 'Geser atau tekan tombol untuk mengubah arah'
            : 'Geser di area permainan untuk bermain'}
        </Text>
      </View>
    </View>
  );
}

// ============================================
// STYLES - Styling untuk semua komponen
// ============================================

/**
 * StyleSheet untuk styling semua komponen UI
 * 
 * TIP UNTUK UPDATE:
 * - Ubah warna untuk mengubah tema
 * - Ubah ukuran untuk mengubah layout
 * - Bisa dibuat responsive dengan Dimensions
 * - Bisa ditambahkan animasi dengan Animated API
 */
const styles = StyleSheet.create({
  // Container utama - membungkus seluruh game
  container: {
    flex: 1,                    // Ambil seluruh ruang yang tersedia
    backgroundColor: '#1a1a2e', // Warna background gelap
    padding: 20,                // Padding di semua sisi
    alignItems: 'center',       // Rata tengah horizontal
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  board: {
    width: GRID_SIZE * CELL_SIZE,
    height: GRID_SIZE * CELL_SIZE,
    backgroundColor: '#16213e',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0f3460',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: '#0f3460',
  },
  snakeHead: {
    backgroundColor: '#4ecdc4',
    borderRadius: 4,
  },
  snakeBody: {
    backgroundColor: '#45b7b8',
    borderRadius: 2,
  },
  food: {
    backgroundColor: '#ff6b6b',
    borderRadius: CELL_SIZE / 2,
  },
  controls: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  directionButtons: {
    alignItems: 'center',
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionButton: {
    backgroundColor: '#4ecdc4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  directionButtonPlaceholder: {
    width: 60,
    height: 60,
    margin: 5,
  },
  directionButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructions: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  instructionText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});

