import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Generation } from '../types/generation';
import { loadHistory, addToHistory, updateInHistory } from '../services/storage.service';

type HistoryState = {
  generations: Generation[];
  hydrated: boolean;
};

const initialState: HistoryState = {
  generations: [],
  hydrated: false,
};

export const hydrateHistory = createAsyncThunk('history/hydrate', async () => {
  return loadHistory();
});

export const pushGeneration = createAsyncThunk(
  'history/push',
  async (entry: Generation, { getState }) => {
    const state = (getState() as { history: HistoryState }).history;
    return addToHistory(state.generations, entry);
  },
);

export const markGenerationSaved = createAsyncThunk(
  'history/markSaved',
  async ({ id, localUri }: { id: string; localUri: string }, { getState }) => {
    const state = (getState() as { history: HistoryState }).history;
    return updateInHistory(state.generations, id, {
      savedLocally: true,
      imageUrl: localUri,
    });
  },
);

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrateHistory.fulfilled, (state, action: PayloadAction<Generation[]>) => {
        state.generations = action.payload;
        state.hydrated = true;
      })
      .addCase(pushGeneration.fulfilled, (state, action: PayloadAction<Generation[]>) => {
        state.generations = action.payload;
      })
      .addCase(markGenerationSaved.fulfilled, (state, action: PayloadAction<Generation[]>) => {
        state.generations = action.payload;
      });
  },
});

export default historySlice.reducer;
