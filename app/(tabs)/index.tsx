import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { IdeaInput } from '../../src/features/generate/components/IdeaInput';
import { GenerateButton } from '../../src/features/generate/components/GenerateButton';
import { useGenerate } from '../../src/features/generate/hooks/useGenerate';

export default function HomeScreen() {
  const router = useRouter();
  const { idea, status, error, isLoading, updateIdea, generate } = useGenerate();

  async function handleGenerate() {
    await generate();
    if (status !== 'error') {
      router.push('/result');
    }
  }

  React.useEffect(() => {
    if (status === 'success') {
      router.push('/result');
    }
  }, [status]);

  React.useEffect(() => {
    if (error) Alert.alert('Generation failed', error);
  }, [error]);

  const statusLabel =
    status === 'generatingPrompt'
      ? 'Writing your prompt…'
      : status === 'generatingImage'
        ? 'Generating image…'
        : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>AI Image Generator</Text>
        <Text style={styles.subtitle}>
          Describe an idea and we'll craft a detailed prompt and generate an image.
        </Text>

        <IdeaInput value={idea} onChange={updateIdea} disabled={isLoading} />

        {statusLabel && <Text style={styles.statusLabel}>{statusLabel}</Text>}

        <GenerateButton
          onPress={handleGenerate}
          loading={isLoading}
          disabled={isLoading || !idea.trim()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  statusLabel: {
    textAlign: 'center',
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
});
