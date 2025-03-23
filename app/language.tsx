import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function LanguageScreen() {
  const { theme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const languages = [
    { id: 'ru' as const, name: t('russian'), flag: '🇷🇺' },
    { id: 'en' as const, name: t('english'), flag: '🇬🇧' },
    { id: 'kk' as const, name: t('kazakh'), flag: '🇰🇿' },
  ];

  const handleLanguageSelect = (selectedLanguage: 'ru' | 'en' | 'kk') => {
    setLanguage(selectedLanguage);
    router.back();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#000000' : '#F2F2F7' },
        animatedStyle,
      ]}
    >
      <View style={[styles.header, { backgroundColor: theme === 'dark' ? '#1C1C1E' : '#FFFFFF' }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme === 'dark' ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>
          {t('language')}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.languageItem,
              { backgroundColor: theme === 'dark' ? '#1C1C1E' : '#FFFFFF' },
            ]}
            onPress={() => handleLanguageSelect(lang.id)}
          >
            <View style={styles.languageInfo}>
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[styles.languageName, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>
                {lang.name}
              </Text>
            </View>
            {language === lang.id && (
              <Ionicons
                name="checkmark"
                size={24}
                color={theme === 'dark' ? '#FF9500' : '#007AFF'}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 17,
  },
}); 