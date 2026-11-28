import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import English from "./locales/en/translation.json";
import Spanish from "./locales/es/translation.json";
import Hebrew from "./locales/he/translation.json";
import Russian from "./locales/ru/translation.json";

const HTML_LANGS = { en: "en", us: "en", ru: "ru", es: "es", he: "he", il: "he" }; // app language → <html lang>, as in index.html
i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .on("languageChanged", (l) => { const h = HTML_LANGS[l.split("-")[0]]; document.documentElement.lang = typeof h === "string" ? h : "en"; }) // CookieYes picks its banner language from <html lang>
  .init({
    detection: {
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      lookupQuerystring: "lang",
      order: ["querystring", "localStorage", "header"],
    },
    fallbackLng: "en",
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
    },
  });

export default i18n;
