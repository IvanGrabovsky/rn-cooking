import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Generation } from '../types/generation';
import { generatePrompt } from '../services/aiPrompt.service';
import { generateImage } from '../services/imageGen.service';

type GenerateState = {
  idea: string;
  current: Generation | null;
  status: 'idle' | 'generatingPrompt' | 'generatingImage' | 'success' | 'error';
  error: string | null;
};

const initialState: GenerateState = {
  idea: '',
  current: null,
  status: 'idle',
  error: null,
};

export const runGeneration = createAsyncThunk(
  'generate/run',
  async ({ idea, apiKey }: { idea: string; apiKey: string }, { dispatch }) => {
    dispatch(setStatus('generatingPrompt'));
    const prompt = await generatePrompt(idea, apiKey);

    dispatch(setStatus('generatingImage'));
    const imageUrl = await generateImage(prompt, apiKey);

    const generation: Generation = {
      id: Date.now().toString(),
      idea,
      prompt,
      imageUrl,
      savedLocally: false,
      createdAt: Date.now(),
    };
    return generation;
  },
);

const generateSlice = createSlice({
  name: 'generate',
  initialState,
  reducers: {
    setIdea(state, action: PayloadAction<string>) {
      state.idea = action.payload;
    },
    setStatus(state, action: PayloadAction<GenerateState['status']>) {
      state.status = action.payload;
    },
    clearCurrent(state) {
      state.current = null;
      state.status = 'idle';
      state.error = null;
    },
    markSavedLocally(state) {
      if (state.current) state.current.savedLocally = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runGeneration.pending, (state) => {
        state.error = null;
        state.status = 'generatingPrompt';
      })
      .addCase(runGeneration.fulfilled, (state, action) => {
        state.current = action.payload;
        state.status = 'success';
      })
      .addCase(runGeneration.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { setIdea, setStatus, clearCurrent, markSavedLocally } = generateSlice.actions;
export default generateSlice.reducer;
