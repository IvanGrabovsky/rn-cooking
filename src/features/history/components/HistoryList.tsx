import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Generation } from '../../../types/generation';

type Props = {
  items: Generation[];
  onSelect: (item: Generation) => void;
};

function HistoryItem({ item, onSelect }: { item: Generation; onSelect: () => void }) {
  const date = new Date(item.createdAt).toLocaleDateString();
  return (
    <TouchableOpacity style={styles.item} onPress={onSelect} activeOpacity={0.7}>
      <Image source={{ uri: item.imageUrl }} style={styles.thumb} />
      <View style={styles.meta}>
        <Text style={styles.idea} numberOfLines={1}>{item.idea}</Text>
        <Text style={styles.date}>{date}</Text>
        {item.savedLocally && <Text style={styles.saved}>Saved locally</Text>}
      </View>
    </TouchableOpacity>
  );
}

export function HistoryList({ items, onSelect }: Props) {
  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No generations yet.</Text>
        <Text style={styles.emptyHint}>Go to Generate to create your first image.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HistoryItem item={item} onSelect={() => onSelect(item)} />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  thumb: {
    width: 80,
    height: 80,
    backgroundColor: '#e5e7eb',
  },
  meta: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    gap: 4,
  },
  idea: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  saved: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '500',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#374151',
  },
  emptyHint: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
