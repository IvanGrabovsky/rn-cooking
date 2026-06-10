import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="result"
          options={{
            title: 'Result',
            presentation: 'modal',
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#6366f1',
          }}
        />
      </Stack>
    </Provider>
  );
}
