import { createSlice } from '@reduxjs/toolkit';

interface TimerState {
  seconds: number;
}

const initialState: TimerState = {
  seconds: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    increment: (state) => {
      state.seconds += 1;
    },
    reset: (state) => {
      state.seconds = 0;
    },
  },
});

export const { increment, reset } = timerSlice.actions;
export default timerSlice.reducer;
