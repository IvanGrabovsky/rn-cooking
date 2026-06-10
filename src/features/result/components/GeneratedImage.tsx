import React, { useState } from 'react';
import { View, Image, ActivityIndicator, Text, StyleSheet, Dimensions } from 'react-native';

const SIZE = Dimensions.get('window').width - 40;

type Props = { uri: string };

export function GeneratedImage({ uri }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      {loading && !error && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.hint}>Generating image…</Text>
        </View>
      )}
      {error && (
        <View style={styles.overlay}>
          <Text style={styles.errorText}>Failed to load image</Text>
        </View>
      )}
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="cover"
        onLoad={() => setLoading(false)}
        onError={() => { setLoading(false); setError(true); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    alignSelf: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
    gap: 8,
    zIndex: 1,
  },
  hint: {
    fontSize: 13,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
  },
});
