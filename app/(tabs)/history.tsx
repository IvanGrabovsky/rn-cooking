import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { HistoryList } from '../../src/features/history/components/HistoryList';
import { useHistory } from '../../src/features/history/hooks/useHistory';
import { Generation } from '../../src/types/generation';
import { useAppDispatch } from '../../src/store/hooks';
import { setIdea } from '../../src/store/generateSlice';
import { clearAllHistory } from '../../src/store/historySlice';

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

  function handleClear() {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all generated images from your history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(clearAllHistory()) },
      ]
    );
  }

  return (
    <View style={styles.root}>
      <Stack.Screen 
        options={{
          headerRight: () => (
            generations.length > 0 ? (
              <Button title="Clear" onPress={handleClear} color="#e53e3e" />
            ) : null
          )
        }} 
      />
      <HistoryList items={generations} onSelect={handleSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9fafb' },
});
