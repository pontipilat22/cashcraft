import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

type Language = 'ru' | 'en' | 'kk';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

const getSystemLanguage = (): Language => {
  const systemLocale = Localization.locale.split('-')[0];
  switch (systemLocale) {
    case 'ru':
      return 'ru';
    case 'kk':
      return 'kk';
    default:
      return 'en';
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage as Language);
      } else {
        const systemLanguage = getSystemLanguage();
        setLanguage(systemLanguage);
        await AsyncStorage.setItem('language', systemLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
      setLanguage('en');
    }
  };

  const handleSetLanguage = async (lang: Language) => {
    setLanguage(lang);
    try {
      await AsyncStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    const translations: Record<string, Record<Language, string>> = {
      accounts: {
        ru: 'Счета',
        en: 'Accounts',
        kk: 'Шоттар',
      },
      transactions: {
        ru: 'Транзакции',
        en: 'Transactions',
        kk: 'Транзакциялар',
      },
      plans: {
        ru: 'Планы',
        en: 'Plans',
        kk: 'Жоспарлар',
      },
      analytics: {
        ru: 'Аналитика',
        en: 'Analytics',
        kk: 'Талдау',
      },
      more: {
        ru: 'Еще',
        en: 'More',
        kk: 'Қосымша',
      },
      addAccount: {
        ru: 'Добавить счет',
        en: 'Add Account',
        kk: 'Шот қосу',
      },
      addTransaction: {
        ru: 'Добавить транзакцию',
        en: 'Add Transaction',
        kk: 'Транзакция қосу',
      },
      addPlan: {
        ru: 'Добавить план',
        en: 'Add Plan',
        kk: 'Жоспар қосу',
      },
      language: {
        ru: 'Язык',
        en: 'Language',
        kk: 'Тіл',
      },
      russian: {
        ru: 'Русский',
        en: 'Russian',
        kk: 'Орыс',
      },
      english: {
        ru: 'Английский',
        en: 'English',
        kk: 'Ағылшын',
      },
      kazakh: {
        ru: 'Казахский',
        en: 'Kazakh',
        kk: 'Қазақ',
      },
      darkMode: {
        ru: 'Темная тема',
        en: 'Dark Mode',
        kk: 'Қараңғы тақырып',
      },
      notifications: {
        ru: 'Уведомления',
        en: 'Notifications',
        kk: 'Хабарламалар',
      },
      security: {
        ru: 'Безопасность',
        en: 'Security',
        kk: 'Қауіпсіздік',
      },
      help: {
        ru: 'Помощь',
        en: 'Help',
        kk: 'Көмек',
      },
      about: {
        ru: 'О приложении',
        en: 'About',
        kk: 'Қолданба туралы',
      },
    };

    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Add default export to fix the warning
export default function LanguageContextWrapper() {
  return null;
} 