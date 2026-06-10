import { configureStore } from '@reduxjs/toolkit';
import generateReducer from './generateSlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    generate: generateReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
