/**
 * ============================================
 * HALAMAN UTAMA - Home Screen
 * ============================================
 * 
 * File ini adalah halaman utama aplikasi yang menampilkan game Snake.
 * 
 * CARA KERJA:
 * 1. Import komponen SnakeGame dari folder components
 * 2. Render komponen SnakeGame di dalam container
 * 3. Container menggunakan flex: 1 untuk mengambil seluruh ruang layar
 * 
 * ROUTE:
 * - Path: / atau tab "Home"
 * - File: app/(tabs)/index.tsx
 * 
 * TIP UNTUK UPDATE:
 * - Bisa ditambahkan header/navbar di sini
 * - Bisa ditambahkan menu sebelum game dimulai
 * - Bisa ditambahkan high score display
 * - Bisa dibuat layout lebih kompleks dengan multiple komponen
 */

import SnakeGame from '@/components/snake-game';
import { StyleSheet, View } from 'react-native';

/**
 * Komponen HomeScreen - Halaman utama aplikasi
 * 
 * @returns {JSX.Element} Komponen View yang berisi game Snake
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Render komponen game Snake */}
      <SnakeGame />
    </View>
  );
}

/**
 * Styles untuk halaman Home
 * 
 * TIP: 
 * - flex: 1 membuat container mengambil seluruh ruang yang tersedia
 * - Bisa ditambahkan background color, padding, dll sesuai kebutuhan
 */
const styles = StyleSheet.create({
  // Container utama - membungkus game Snake
  container: {
    flex: 1, // Ambil seluruh ruang layar yang tersedia
  },
});
