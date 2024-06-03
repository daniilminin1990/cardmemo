import { initReactI18next } from 'react-i18next'

import i18n, { InitOptions } from 'i18next'

import byTranslations from '../../../common/locales/by/translation.json'
import enTranslations from '../../../common/locales/en/translation.json'
import kzTranslations from '../../../common/locales/kz/translation.json'
import ruTranslations from '../../../common/locales/ru/translation.json'
import uaTranslations from '../../../common/locales/ua/translation.json'

const defaultLanguage = localStorage.getItem('locale') || 'en'

const options: InitOptions = {
  debug: true,
  detection: {
    cache: ['cookie'],
    order: ['queryString', 'cookie'],
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

i18n.use(initReactI18next).init(options)
export default i18n
