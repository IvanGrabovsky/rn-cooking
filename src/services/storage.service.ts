import AsyncStorage from '@react-native-async-storage/async-storage';
import { Generation } from '../types/generation';

const HISTORY_KEY = '@ai_image_history';

export async function loadHistory(): Promise<Generation[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as Generation[];
}

export async function saveHistory(generations: Generation[]): Promise<void> {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(generations));
}

export async function addToHistory(
  generations: Generation[],
  entry: Generation,
): Promise<Generation[]> {
  const updated = [entry, ...generations];
  await saveHistory(updated);
  return updated;
}

export async function updateInHistory(
  generations: Generation[],
  id: string,
  patch: Partial<Generation>,
): Promise<Generation[]> {
  const updated = generations.map((g) => (g.id === id ? { ...g, ...patch } : g));
  await saveHistory(updated);
  return updated;
}

export async function clearHistory(): Promise<void> {
  await saveHistory([]);
}
