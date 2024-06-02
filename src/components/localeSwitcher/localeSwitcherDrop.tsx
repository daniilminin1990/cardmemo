import React, { useEffect, useState } from 'react'
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

const LocaleSwitcherDrop = () => {
  const { i18n } = useTranslation()
  const icons = {
    by: byIcon,
    en: enIcon,
    kz: kzIcon,
    ru: ruIcon,
    ua: uaIcon,
  }
  const [iconFlag, setIconFlag] = useState(i18n.language === 'en' ? enIcon : ruIcon)

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale')

    if (storedLocale) {
      setIconFlag(storedLocale === 'en' ? enIcon : ruIcon)
    }
  }, [])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    // setIconFlag(lang === 'en' ? enIcon : ruIcon)
    setIconFlag(icons[lang])
    localStorage.setItem('locale', lang)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, lang: string) => {
    if (event.key === 'Enter') {
      changeLanguage(lang)
    }
  }
  const { t } = useTranslation()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Update dimensions'} className={s.IconButton}>
          <img alt={''} className={s.flagOwn} height={30} src={iconFlag} width={40} />
          <ArrowIosDownOutline className={s.iconArrowDown} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={3}>
          <DropdownMenu.Item asChild>
            <div
              className={s.boxContent}
              onClick={() => changeLanguage('en')}
              onKeyDown={e => handleKeyDown(e, 'en')}
            >
              <img alt={'en'} className={s.flagEng} src={icons.en} />
              <Typography className={s.dropdownText} variant={'caption'}>
                {t('localeSwitcher.language.en')}
              </Typography>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <div
              className={s.boxContent}
              onClick={() => changeLanguage('ru')}
              onKeyDown={e => handleKeyDown(e, 'ru')}
            >
              <img alt={'ru'} className={s.flag} src={icons.ru} />
              <Typography className={s.dropdownText} variant={'caption'}>
                {t('localeSwitcher.language.ru')}
              </Typography>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <div
              className={s.boxContent}
              onClick={() => changeLanguage('by')}
              onKeyDown={e => handleKeyDown(e, 'by')}
            >
              <img alt={'by'} className={s.flag} src={icons.by} />
              <Typography className={s.dropdownText} variant={'caption'}>
                {t('localeSwitcher.language.by')}
              </Typography>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <div
              className={s.boxContent}
              onClick={() => changeLanguage('kz')}
              onKeyDown={e => handleKeyDown(e, 'kz')}
            >
              <img alt={'kz'} className={s.flag} src={icons.kz} />
              <Typography className={s.dropdownText} variant={'caption'}>
                {t('localeSwitcher.language.kz')}
              </Typography>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <div
              className={s.boxContent}
              onClick={() => changeLanguage('ua')}
              onKeyDown={e => handleKeyDown(e, 'ua')}
            >
              <img alt={'ua'} className={s.flag} src={icons.ua} />
              <Typography className={s.dropdownText} variant={'caption'}>
                {t('localeSwitcher.language.ua')}
              </Typography>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default LocaleSwitcherDrop
