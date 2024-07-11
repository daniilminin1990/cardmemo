import { useCallback, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import byIcon from '@/assets/Lang/by.svg'
import enIcon from '@/assets/Lang/gb.svg'
import kzIcon from '@/assets/Lang/kz.svg'
import ruIcon from '@/assets/Lang/ru.svg'
import uaIcon from '@/assets/Lang/ua.svg'

type LangIcon = typeof byIcon | typeof enIcon | typeof kzIcon | typeof ruIcon | typeof uaIcon
export type LangType = 'by' | 'en' | 'kz' | 'ru' | 'ua'
export type FullName = 'English' | 'Беларуская' | 'Русский' | 'Українська' | 'Қазақ'

type LangData = {
  fullName: FullName
  icon: LangIcon
  isoCode: LangType
}

type TypedLangData = Record<LangType, LangData>

export const useLangData = () => {
  const { i18n } = useTranslation()

  const langData: TypedLangData = {
    by: { fullName: 'Беларуская', icon: byIcon, isoCode: 'by' },
    en: { fullName: 'English', icon: enIcon, isoCode: 'en' },
    kz: { fullName: 'Қазақ', icon: kzIcon, isoCode: 'kz' },
    ru: { fullName: 'Русский', icon: ruIcon, isoCode: 'ru' },
    ua: { fullName: 'Українська', icon: uaIcon, isoCode: 'ua' },
  }
  const [iconFlag, setIconFlag] = useState(langData[i18n.language as LangType]?.icon || enIcon)

  useLayoutEffect(() => {
    const storedLocale = localStorage.getItem('locale') || i18n.language

    setIconFlag(langData[storedLocale as LangType]?.icon || enIcon)
  }, [])

  const changeLanguage = useCallback(
    (lang: string, icon: string) => {
      i18n.changeLanguage(lang)
      setIconFlag(icon)
      localStorage.setItem('locale', lang)
    },
    [i18n]
  )

  return { changeLanguage, iconFlag, langData }
}
