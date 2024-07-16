import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CorrectOption {
  id: string;
  answer: string;
}

interface CorrectAnswerState {
  correctOptions: CorrectOption[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CorrectAnswerState = {
  correctOptions: [],
  status: 'idle',
  error: null,
};

export const fetchCorrectAnswer = createAsyncThunk(
  'correctAnswer/fetchCorrectAnswer',
  async (questionId: number) => {
    const response = await axios.get(`https://cross-platform.rp.devfactory.com/reveal?id=${questionId}`);
    return response.data.correct_options;
  }
);

const correctAnswerSlice = createSlice({
  name: 'correctAnswer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCorrectAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCorrectAnswer.fulfilled, (state, action: PayloadAction<CorrectOption[]>) => {
        state.status = 'succeeded';
        state.correctOptions = action.payload;
      })
      .addCase(fetchCorrectAnswer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch correct answer';
      });
  },
});

export default correctAnswerSlice.reducer;
