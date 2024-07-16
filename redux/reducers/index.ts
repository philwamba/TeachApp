import { combineReducers } from '@reduxjs/toolkit';
import mcqReducer from './mcqReducer';
import timerReducer from './timerSlice';
import correctAnswerReducer from './correctAnswerSlice';

const rootReducer = combineReducers({
  mcqs: mcqReducer,
  timer: timerReducer,
  correctAnswer: correctAnswerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;