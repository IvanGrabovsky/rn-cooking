import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setIdea, runGeneration, clearCurrent } from '../../../store/generateSlice';
import { pushGeneration } from '../../../store/historySlice';

export function useGenerate() {
  const dispatch = useAppDispatch();
  const { idea, status, error, current } = useAppSelector((s) => s.generate);

  const updateIdea = useCallback(
    (text: string) => dispatch(setIdea(text)),
    [dispatch],
  );

  const generate = useCallback(async () => {
    if (!idea.trim()) return;
    const apiKey = process.env.EXPO_PUBLIC_HF_TOKEN || '';
    const result = await dispatch(runGeneration({ idea: idea.trim(), apiKey }));
    if (runGeneration.fulfilled.match(result)) {
      dispatch(pushGeneration(result.payload));
    }
  }, [dispatch, idea]);

  const reset = useCallback(() => dispatch(clearCurrent()), [dispatch]);

  const isLoading = status === 'generatingPrompt' || status === 'generatingImage';

  return { idea, status, error, current, isLoading, updateIdea, generate, reset };
}
