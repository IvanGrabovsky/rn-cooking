import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
  disabled?: boolean;
};

export function IdeaInput({ value, onChange, disabled }: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="e.g. astronaut cat on the moon"
        placeholderTextColor="#9ca3af"
        editable={!disabled}
        multiline
        maxLength={200}
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 80,
  },
  input: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
});
