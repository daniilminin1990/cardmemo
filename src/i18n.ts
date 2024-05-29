import { initReactI18next } from 'react-i18next'

import i18n, { InitOptions } from 'i18next'

import enTranslations from '../public/locales/en/translation.json'
import ruTranslations from '../public/locales/ru/translation.json'

const options: InitOptions = {
  debug: true,
  detection: {
    cache: ['cookie'],
    order: ['queryString', 'cookie'],
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations,
    },
    ru: {
      translation: ruTranslations,
    },
  },
}

i18n.use(initReactI18next).init(options)
export default i18n
