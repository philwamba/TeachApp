import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Option {
  id: string;
  answer: string;
}

export interface User {
  name: string;
  avatar: string;
}

export interface Question {
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: User;
}

interface MCQState {
  questions: Question[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MCQState = {
  questions: [],
  status: 'idle',
  error: null,
};

export const fetchMCQs = createAsyncThunk(
  'mcqs/fetchMCQs',
  async (page: number) => {
    const response = await axios.get(`https://cross-platform.rp.devfactory.com/for_you?page=${page}`);
    return response.data;
  }
);

const mcqSlice = createSlice({
  name: 'mcqs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMCQs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMCQs.fulfilled, (state, action: PayloadAction<Question>) => {
        state.status = 'succeeded';
        state.questions = [...state.questions, action.payload];
      })
      .addCase(fetchMCQs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch MCQs';
      });
  },
});

export default mcqSlice.reducer;