import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MoreScreen() {
  const { theme, toggleTheme } = useTheme();
  const { t, language } = useLanguage();
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

  const menuItems = [
    {
      id: 'language',
      title: t('language'),
      value: language === 'ru' ? t('russian') : language === 'kk' ? t('kazakh') : t('english'),
      icon: 'language' as const,
      onPress: () => router.push('/language'),
    },
  ];

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#141414' : '#F2F2F7' },
        animatedStyle,
      ]}
    >
      <ScrollView style={styles.content}>
        <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#1C1C1E' : '#FFFFFF' }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && {
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme === 'dark' ? '#38383A' : '#C6C6C8',
                },
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={theme === 'dark' ? '#F3492F' : '#007AFF'}
                />
                <Text
                  style={[styles.menuItemTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}
                >
                  {item.title}
                </Text>
              </View>
              {item.value && (
                <View style={styles.menuItemRight}>
                  <Text
                    style={[
                      styles.menuItemValue,
                      { color: theme === 'dark' ? '#FFFFFF' : '#000000' },
                    ]}
                  >
                    {item.value}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={theme === 'dark' ? '#8E8E93' : '#8E8E93'}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#1C1C1E' : '#FFFFFF' }]}>
          <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name={theme === 'dark' ? 'moon' : 'sunny'}
                size={24}
                color={theme === 'dark' ? '#F3492F' : '#007AFF'}
              />
              <Text
                style={[styles.menuItemTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}
              >
                {t('darkMode')}
              </Text>
            </View>
            <View style={styles.toggleContainer}>
              <View
                style={[
                  styles.toggleTrack,
                  {
                    backgroundColor: theme === 'dark' ? '#F3492F' : '#007AFF',
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.toggleThumb,
                    {
                      transform: [
                        {
                          translateX: theme === 'dark' ? 20 : 0,
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  section: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 17,
    marginLeft: 12,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    fontSize: 17,
    marginRight: 4,
  },
  toggleContainer: {
    width: 50,
    height: 30,
  },
  toggleTrack: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
});
