import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LanguageScreen() {
  const opacity = useSharedValue(0);
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    opacity.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const languages = [
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'kk', label: 'Қазақша', flag: '🇰🇿' },
  ];

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={[styles.header, theme === 'dark' && styles.darkHeader]}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color={theme === 'dark' ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
          <Text style={[styles.title, theme === 'dark' && styles.darkText]}>
            {t('language')}
          </Text>
        </View>

        <View style={[styles.languagesContainer, theme === 'dark' && styles.darkContent]}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                language === lang.code && styles.selectedLanguage,
                theme === 'dark' && styles.darkLanguageOption
              ]}
              onPress={() => {
                setLanguage(lang.code as 'ru' | 'en' | 'kk');
                router.back();
              }}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.flag}>{lang.flag}</Text>
                <Text style={[
                  styles.languageOptionText,
                  language === lang.code && styles.selectedLanguageText,
                  theme === 'dark' && styles.darkText
                ]}>
                  {lang.label}
                </Text>
              </View>
              {language === lang.code && (
                <Ionicons 
                  name="checkmark-circle" 
                  size={24} 
                  color={theme === 'dark' ? '#FF9500' : '#007AFF'} 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  darkHeader: {
    backgroundColor: '#1C1C1E',
    borderBottomColor: '#38383A',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  languagesContainer: {
    flex: 1,
    padding: 16,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  selectedLanguage: {
    backgroundColor: '#F2F2F7',
  },
  languageOptionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedLanguageText: {
    fontWeight: '600',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkContent: {
    backgroundColor: '#000000',
  },
  darkLanguageOption: {
    backgroundColor: '#1C1C1E',
  },
}); 