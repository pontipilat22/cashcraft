import React from 'react';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';

function CustomStatusBar() {
  const { theme } = useTheme();
  return (
    <StatusBar 
      style={theme === 'dark' ? 'light' : 'dark'} 
      backgroundColor={theme === 'dark' ? '#141414' : '#FFFFFF'}
      translucent
    />
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="language" 
        options={{ 
          presentation: 'modal',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CustomStatusBar />
        <RootLayoutNav />
      </LanguageProvider>
    </ThemeProvider>
  );
} 