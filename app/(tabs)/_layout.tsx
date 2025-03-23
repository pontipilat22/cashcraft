import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function TabsLayout() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme === 'dark' ? '#F3492F' : '#007AFF',
        tabBarInactiveTintColor: theme === 'dark' ? '#8E8E93' : '#8E8E93',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1C1C1E' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: theme === 'dark' ? '#2C2C2E' : '#E5E5E5',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarItemStyle: {
          paddingBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="accounts"
        options={{
          title: t('accounts'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: t('transactions'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: t('plans'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: t('analytics'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t('more'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 