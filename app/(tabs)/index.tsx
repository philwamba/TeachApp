import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import MCQFeed from '@/components/MCQFeed';
import Timer from '@/components/Timer';
import { increment } from '@/redux/reducers/timerSlice';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(increment());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Timer style={styles.timer} />
      <Text style={styles.title}>For You</Text>
      <MCQFeed />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  timer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 1,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
