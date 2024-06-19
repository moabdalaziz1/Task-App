import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todoSlice';
import darkLightReducer from '../features/darkLightSilce';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    siteMood: darkLightReducer,
  },
});
