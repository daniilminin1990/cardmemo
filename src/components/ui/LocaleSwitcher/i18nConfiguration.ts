import { initReactI18next } from 'react-i18next'

import { byTranslation } from '@/common/locales/by/translation'
import { enTranslation } from '@/common/locales/en/translation'
import { kzTranslation } from '@/common/locales/kz/translation'
import { ruTranslation } from '@/common/locales/ru/translation'
import { uaTranslation } from '@/common/locales/ua/translation'
import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

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
      translation: byTranslation,
    },
    en: {
      translation: enTranslation,
    },
    kz: {
      translation: kzTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
    ua: {
      translation: uaTranslation,
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['by', 'en', 'kz', 'ru', 'ua'],
    ...i18nextOptions,
  })
export default i18n
