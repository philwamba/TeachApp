import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Timer: React.FC<{ style?: object }> = ({ style }) => {
  const seconds = useSelector((state: RootState) => state.timer.seconds);

  return (
    <View style={[styles.timerContainer, style]}>
      <Text style={styles.timerText}>{seconds}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  timerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Timer;
