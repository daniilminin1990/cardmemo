import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import en from '@/assets/Lang/English.png'
import ru from '@/assets/Lang/Russian.png'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import style from './localeSwitcher.module.scss'

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

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Update dimensions'} className={style.IconButton}>
          <img alt={''} className={style.flagOwn} height={30} src={iconFlag} width={40} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={style.DropdownMenuContent} sideOffset={5}>
          <DropdownMenu.Item asChild>
            <div className={style.boxContent} onKeyDown={e => handleKeyDown(e, 'en')}>
              <img
                alt={''}
                className={style.flagEng}
                onClick={() => changeLanguage('en')}
                src={en}
              />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <div className={style.boxContent} onKeyDown={e => handleKeyDown(e, 'ru')}>
              <img alt={''} className={style.flag} onClick={() => changeLanguage('ru')} src={ru} />
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className={'DropdownMenuArrow'} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default LocaleSwitcherDrop
