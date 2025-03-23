import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function TransactionsScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#141414' : '#F2F2F7' },
        animatedStyle,
      ]}
    >
      <ScrollView style={styles.content}>
        {/* Transactions will be added here */}
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
}); 