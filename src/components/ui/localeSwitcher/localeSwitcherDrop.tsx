import { useCallback, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import byIcon from '@/assets/Lang/by.svg'
import enIcon from '@/assets/Lang/gb.svg'
import kzIcon from '@/assets/Lang/kz.svg'
import ruIcon from '@/assets/Lang/ru.svg'
import uaIcon from '@/assets/Lang/ua.svg'
import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Typography from '@/components/ui/Typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './localeSwitcher.module.scss'

type LangIcon = typeof byIcon | typeof enIcon | typeof kzIcon | typeof ruIcon | typeof uaIcon
type LangType = 'by' | 'en' | 'kz' | 'ru' | 'ua'
type LangData = {
  icon: LangIcon
  isoCode: LangType
}

type TypedLangData = Record<LangType, LangData>

const LocaleSwitcherDrop = () => {
  const { i18n } = useTranslation()

  const langData: TypedLangData = {
    by: { icon: byIcon, isoCode: 'by' },
    en: { icon: enIcon, isoCode: 'en' },
    kz: { icon: kzIcon, isoCode: 'kz' },
    ru: { icon: ruIcon, isoCode: 'ru' },
    ua: { icon: uaIcon, isoCode: 'ua' },
  }
  const [iconFlag, setIconFlag] = useState(
    i18n.language === 'en' ? enIcon : `${langData[i18n.language as LangType].isoCode}`
  )

  useLayoutEffect(() => {
    const storedLocale = localStorage.getItem('locale')

    if (storedLocale) {
      setIconFlag(`${langData[storedLocale as LangType].icon}`)
    }
  }, [])

  const changeLanguage = useCallback(
    (lang: string, icon: string) => {
      i18n.changeLanguage(lang)
      setIconFlag(icon)
      localStorage.setItem('locale', lang)
    },
    [i18n]
  )

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button aria-label={'Update dimensions'} className={s.IconButton}>
          <img alt={'Country flag'} className={s.flag} height={30} src={iconFlag} width={40} />
          <ArrowIosDownOutline className={s.iconArrowDown} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={3}>
          {Object.entries(langData).map(([key, value]) => (
            <DropdownMenuItem
              icon={value.icon}
              isoCode={value.isoCode}
              key={key}
              onSelect={() => changeLanguage(key, value.icon)}
            />
          ))}
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

type DropdownMenuItemProps = {
  icon: string
  isoCode: string
  onSelect: () => void
}

const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  const { t } = useTranslation()
  const { icon, isoCode, onSelect } = props

  return (
    <DropdownMenu.Item asChild>
      <div
        className={s.boxContent}
        onClick={onSelect}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSelect()
          }
        }}
      >
        <img alt={`${isoCode} flag`} className={s.dropItemFlag} src={icon} />
        <Typography className={s.dropdownText} variant={'caption'}>
          {t(`localeSwitcher.ownLanguages.${isoCode}`)}
        </Typography>
      </div>
    </DropdownMenu.Item>
  )
}

export default LocaleSwitcherDrop
