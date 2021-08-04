import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
      useSuspense: false,
    },
    backend: {
      loadPath: '/pay/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
