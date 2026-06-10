import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = { prompt: string };

export function PromptCard({ prompt }: Props) {
  const [expanded, setExpanded] = useState(false);
  const preview = prompt.length > 120 ? prompt.slice(0, 120) + '…' : prompt;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Generated prompt</Text>
      <Text style={styles.text}>{expanded ? prompt : preview}</Text>
      {prompt.length > 120 && (
        <TouchableOpacity onPress={() => setExpanded((e) => !e)}>
          <Text style={styles.toggle}>{expanded ? 'Show less' : 'Show more'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  toggle: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '500',
    marginTop: 2,
  },
});
