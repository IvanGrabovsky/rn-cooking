import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PromptCard } from '../src/features/result/components/PromptCard';
import { GeneratedImage } from '../src/features/result/components/GeneratedImage';
import { useSaveImage } from '../src/features/result/hooks/useSaveImage';
import { useAppSelector } from '../src/store/hooks';

export default function ResultScreen() {
  const { historyId } = useLocalSearchParams<{ historyId?: string }>();
  const { saveImage, saving, savedUri } = useSaveImage();

  const current = useAppSelector((s) => s.generate.current);
  const historyItem = useAppSelector((s) =>
    historyId ? s.history.generations.find((g) => g.id === historyId) : undefined,
  );

  const generation = historyItem ?? current;

  if (!generation) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No result to display.</Text>
      </View>
    );
  }

  async function handleSave() {
    try {
      await saveImage(generation!.id, generation!.imageUrl);
      Alert.alert('Saved', 'Image saved to your photo library.');
    } catch (e: unknown) {
      Alert.alert('Save failed', e instanceof Error ? e.message : 'Unknown error');
    }
  }

  const alreadySaved = generation.savedLocally || !!savedUri;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.idea}>{generation.idea}</Text>
      <PromptCard prompt={generation.prompt} />
      <GeneratedImage uri={generation.imageUrl} />

      <TouchableOpacity
        style={[styles.saveBtn, alreadySaved && styles.savedBtn]}
        onPress={handleSave}
        disabled={saving || alreadySaved}
        activeOpacity={0.8}
      >
        <Text style={styles.saveBtnLabel}>
          {saving ? 'Saving…' : alreadySaved ? 'Saved to library ✓' : 'Save image'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 16,
    backgroundColor: '#fff',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 16,
  },
  idea: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  saveBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  savedBtn: {
    backgroundColor: '#10b981',
  },
  saveBtnLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
