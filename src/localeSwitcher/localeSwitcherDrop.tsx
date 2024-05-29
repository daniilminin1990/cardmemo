import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import en from '@/assets/Lang/English.png'
import ru from '@/assets/Lang/Russian.png'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import style from './localeSwitcher.module.scss'
const LocaleSwitcherDrop = () => {
  const { i18n } = useTranslation()

  const [iconFlag, setIconFlag] = useState('ru')
  const onHandleClickLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'ru')
    setIconFlag('ru')
  }
  const onHandleClickLang2 = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'en')
    setIconFlag('en')
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Update dimensions'} className={style.IconButton}>
          <img
            alt={''}
            className={style.flagOwn}
            height={30}
            src={iconFlag === 'ru' ? ru : en}
            width={40}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={style.DropdownMenuContent} sideOffset={5}>
          <DropdownMenu.Item>
            <div className={style.boxContent}>
              <img alt={''} className={style.flagEng} onClick={onHandleClickLang2} src={en} />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <div className={style.boxContent}>
              <img alt={''} className={style.flag} onClick={onHandleClickLang} src={ru} />
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className={'DropdownMenuArrow'} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default LocaleSwitcherDrop
