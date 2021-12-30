import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import  English from './locales/en/translation.json'
import  Spanish from './locales/es/translation.json'
import  Hebrew from './locales/he/translation.json'
import  Russian from './locales/ru/translation.json'
i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    detection: {
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: 'lang',
      order: ['querystring', 'localStorage', 'header'],
    },
    fallbackLng: 'en',
    resources: {
      en: { translation: English },
      us: { translation: English },
      es: { translation: Spanish },
      il: { translation: Hebrew },
      he: { translation: Hebrew },
      ru: { translation: Russian },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
      useSuspense: false,
    }
  });

export default i18n;
