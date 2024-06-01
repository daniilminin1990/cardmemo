import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import en from '@/assets/Lang/English.png'
import ru from '@/assets/Lang/Russian.png'
import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Typography from '@/components/ui/Typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './localeSwitcher.module.scss'

const LocaleSwitcherDrop = () => {
  const { i18n } = useTranslation()
  const [iconFlag, setIconFlag] = useState(i18n.language === 'en' ? en : ru)

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale')

    if (storedLocale) {
      setIconFlag(storedLocale === 'en' ? en : ru)
    }
  }, [])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setIconFlag(lang === 'en' ? en : ru)
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
              <img alt={''} className={s.flagEng} src={en} />
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
              <img alt={''} className={s.flag} src={ru} />
              <Typography className={s.dropdownText} variant={'caption'}>
                {t('localeSwitcher.language.ru')}
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
