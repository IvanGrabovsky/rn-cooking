import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setIdea, runGeneration, clearCurrent } from '../../../store/generateSlice';
import { pushGeneration } from '../../../store/historySlice';

// Real apps: store the API key in SecureStore, not a plain constant.
const NANO_BANANA_API_KEY = process.env.EXPO_PUBLIC_NANO_BANANA_API_KEY ?? '';

export function useGenerate() {
  const dispatch = useAppDispatch();
  const { idea, status, error, current } = useAppSelector((s) => s.generate);

  const updateIdea = useCallback(
    (text: string) => dispatch(setIdea(text)),
    [dispatch],
  );

  const generate = useCallback(async () => {
    if (!idea.trim()) return;
    const result = await dispatch(runGeneration({ idea: idea.trim(), apiKey: NANO_BANANA_API_KEY }));
    if (runGeneration.fulfilled.match(result)) {
      dispatch(pushGeneration(result.payload));
    }
  }, [dispatch, idea]);

  const reset = useCallback(() => dispatch(clearCurrent()), [dispatch]);

  const isLoading = status === 'generatingPrompt' || status === 'generatingImage';

  return { idea, status, error, current, isLoading, updateIdea, generate, reset };
}
