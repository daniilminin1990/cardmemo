import { initReactI18next } from 'react-i18next'

import i18n, { InitOptions } from 'i18next'

import byTranslations from '../../../public/locales/by/translation.json'
import enTranslations from '../../../public/locales/en/translation.json'
import kzTranslations from '../../../public/locales/kz/translation.json'
import ruTranslations from '../../../public/locales/ru/translation.json'
import uaTranslations from '../../../public/locales/ua/translation.json'
const loc = localStorage.getItem('locale') || 'en'

const options: InitOptions = {
  debug: true,
  detection: {
    cache: ['cookie'],
    order: ['queryString', 'cookie'],
  },
  fallbackLng: loc,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    by: {
      translation: byTranslations as typeof byTranslations,
    },
    en: {
      translation: enTranslations as typeof enTranslations,
    },
    kz: {
      translation: kzTranslations as typeof kzTranslations,
    },
    ru: {
      translation: ruTranslations as typeof ruTranslations,
    },
    ua: {
      translation: uaTranslations as typeof uaTranslations,
    },
  },
}

i18n.use(initReactI18next).init(options)
export default i18n
