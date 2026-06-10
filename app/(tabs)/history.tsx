import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { HistoryList } from '../../src/features/history/components/HistoryList';
import { useHistory } from '../../src/features/history/hooks/useHistory';
import { Generation } from '../../src/types/generation';
import { useAppDispatch } from '../../src/store/hooks';
import { setIdea } from '../../src/store/generateSlice';

export default function HistoryScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { generations } = useHistory();

  function handleSelect(item: Generation) {
    // Rehydrate the generate slice with the historical result and open result screen
    dispatch(setIdea(item.idea));
    // Push a synthetic "current" by navigating with params
    router.push({ pathname: '/result', params: { historyId: item.id } });
  }

  return (
    <View style={styles.root}>
      <HistoryList items={generations} onSelect={handleSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9fafb' },
});
