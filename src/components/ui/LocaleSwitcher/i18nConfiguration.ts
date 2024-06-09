import { initReactI18next } from 'react-i18next'

import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import byTranslations from '../../../common/locales/by/translation.json'
import enTranslations from '../../../common/locales/en/translation.json'
import kzTranslations from '../../../common/locales/kz/translation.json'
import ruTranslations from '../../../common/locales/ru/translation.json'
import uaTranslations from '../../../common/locales/ua/translation.json'

const defaultLanguage = localStorage.getItem('locale') || 'en'

const i18nextOptions: InitOptions = {
  debug: true,
  detection: {
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'],
    order: [
      'querystring',
      'cookie',
      'localStorage',
      'sessionStorage',
      'navigator',
      'htmlTag',
      'path',
      'subdomain',
    ],
  },
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    by: {
      translation: byTranslations,
    },
    en: {
      translation: enTranslations,
    },
    kz: {
      translation: kzTranslations,
    },
    ru: {
      translation: ruTranslations,
    },
    ua: {
      translation: uaTranslations,
    },
  } as const,
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['by', 'en', 'kz', 'ru', 'ua'],
    ...i18nextOptions,
  })
export default i18n
