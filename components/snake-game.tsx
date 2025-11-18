import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const GRID_SIZE = 20; // Ukuran grid (20x20)
const CELL_SIZE = Dimensions.get('window').width / GRID_SIZE; // Ukuran setiap sel
const INITIAL_SNAKE = [{ x: 10, y: 10 }]; // Posisi awal ular
const INITIAL_DIRECTION = { x: 1, y: 0 }; // Arah awal (ke kanan)
const GAME_SPEED = 150; // Kecepatan permainan (ms)

// Tipe data untuk posisi
type Position = { x: number; y: number };

export default function SnakeGame() {
  // State untuk ular (array posisi)
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  
  // State untuk makanan
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  
  // State untuk arah pergerakan
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  
  // State untuk skor
  const [score, setScore] = useState(0);
  
  // State untuk permainan selesai
  const [gameOver, setGameOver] = useState(false);
  
  // State untuk permainan berjalan
  const [isRunning, setIsRunning] = useState(false);
  
  // Ref untuk menyimpan arah berikutnya (untuk menghindari bug)
  const nextDirectionRef = useRef<Position>(INITIAL_DIRECTION);

  // Fungsi untuk membuat makanan di posisi acak
  const generateFood = (): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    
    // Pastikan makanan tidak muncul di tubuh ular
    const isOnSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (isOnSnake) {
      return generateFood(); // Buat ulang jika ada di ular
    }
    
    return newFood;
  };

  // Fungsi untuk memeriksa tabrakan
  const checkCollision = (head: Position, body: Position[]): boolean => {
    // Cek tabrakan dengan dinding
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }
    
    // Cek tabrakan dengan tubuh sendiri
    for (let i = 1; i < body.length; i++) {
      if (head.x === body[i].x && head.y === body[i].y) {
        return true;
      }
    }
    
    return false;
  };

  // Loop utama permainan
  useEffect(() => {
    if (!isRunning || gameOver) return;

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        // Perbarui arah dari ref
        const currentDirection = nextDirectionRef.current;
        
        // Hitung posisi kepala baru
        const head = prevSnake[0];
        const newHead: Position = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
        };

        // Cek tabrakan
        if (checkCollision(newHead, prevSnake)) {
          setGameOver(true);
          setIsRunning(false);
          return prevSnake;
        }

        // Buat ular baru dengan kepala baru
        const newSnake = [newHead, ...prevSnake];

        // Cek apakah ular memakan makanan
        if (newHead.x === food.x && newHead.y === food.y) {
          // Tambah skor
          setScore((prev) => prev + 10);
          
          // Buat makanan baru
          setFood(generateFood());
          
          // Ular bertambah panjang (tidak perlu menghapus ekor)
          return newSnake;
        } else {
          // Hapus ekor jika tidak makan
          newSnake.pop();
          return newSnake;
        }
      });
    }, GAME_SPEED);

    return () => clearInterval(gameInterval);
  }, [isRunning, gameOver, food]);

  // Fungsi untuk mengubah arah
  const changeDirection = (newDirection: Position) => {
    // Cegah gerakan berlawanan arah
    if (
      (newDirection.x === -direction.x && newDirection.x !== 0) ||
      (newDirection.y === -direction.y && newDirection.y !== 0)
    ) {
      return;
    }
    
    nextDirectionRef.current = newDirection;
    setDirection(newDirection);
  };

  // PanResponder untuk swipe gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Tentukan arah berdasarkan gerakan yang lebih besar
        if (absDx > absDy) {
          // Gerakan horizontal
          if (dx > 0) {
            changeDirection({ x: 1, y: 0 }); // Kanan
          } else {
            changeDirection({ x: -1, y: 0 }); // Kiri
          }
        } else {
          // Gerakan vertikal
          if (dy > 0) {
            changeDirection({ x: 0, y: 1 }); // Bawah
          } else {
            changeDirection({ x: 0, y: -1 }); // Atas
          }
        }
      },
    })
  ).current;

  // Fungsi untuk mengulangi permainan
  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    setDirection(INITIAL_DIRECTION);
    nextDirectionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  };

  // Fungsi untuk memulai permainan
  const startGame = () => {
    setIsRunning(true);
    setGameOver(false);
  };

  // Render sel di grid
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const isSnakeBody = snake.some(
      (segment, index) => segment.x === x && segment.y === y && index > 0
    );
    const isFood = food.x === x && food.y === y;

    let cellStyle = styles.cell;
    if (isSnakeHead) {
      cellStyle = [styles.cell, styles.snakeHead];
    } else if (isSnakeBody) {
      cellStyle = [styles.cell, styles.snakeBody];
    } else if (isFood) {
      cellStyle = [styles.cell, styles.food];
    }

    return <View key={`${x}-${y}`} style={cellStyle} />;
  };

  return (
    <View style={styles.container}>
      {/* Header dengan Skor */}
      <View style={styles.header}>
        <Text style={styles.scoreText}>Skor: {score}</Text>
        {gameOver && <Text style={styles.gameOverText}>Permainan Selesai!</Text>}
      </View>

      {/* Papan Permainan */}
      <View style={styles.board} {...panResponder.panHandlers}>
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <View key={y} style={styles.row}>
            {Array.from({ length: GRID_SIZE }).map((_, x) => renderCell(x, y))}
          </View>
        ))}
      </View>

      {/* Tombol Kontrol */}
      <View style={styles.controls}>
        {!isRunning && !gameOver && (
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Mulai Permainan</Text>
          </TouchableOpacity>
        )}
        
        {gameOver && (
          <TouchableOpacity style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Ulangi</Text>
          </TouchableOpacity>
        )}

        {/* Tombol Arah */}
        {isRunning && !gameOver && (
          <View style={styles.directionButtons}>
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => changeDirection({ x: 0, y: -1 })}
              >
                <Text style={styles.directionButtonText}>↑</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => changeDirection({ x: -1, y: 0 })}
              >
                <Text style={styles.directionButtonText}>←</Text>
              </TouchableOpacity>
              <View style={styles.directionButtonPlaceholder} />
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => changeDirection({ x: 1, y: 0 })}
              >
                <Text style={styles.directionButtonText}>→</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => changeDirection({ x: 0, y: 1 })}
              >
                <Text style={styles.directionButtonText}>↓</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Petunjuk */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          {isRunning
            ? 'Geser atau tekan tombol untuk mengubah arah'
            : 'Geser di area permainan untuk bermain'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    alignItems: 'center',
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

