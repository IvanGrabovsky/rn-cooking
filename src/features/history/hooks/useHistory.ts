import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { hydrateHistory } from '../../../store/historySlice';

export function useHistory() {
  const dispatch = useAppDispatch();
  const { generations, hydrated } = useAppSelector((s) => s.history);

  useEffect(() => {
    if (!hydrated) dispatch(hydrateHistory());
  }, [hydrated, dispatch]);

  return { generations, hydrated };
}
