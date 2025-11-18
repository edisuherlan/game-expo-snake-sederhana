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
