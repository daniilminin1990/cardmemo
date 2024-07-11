import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { Link, useLocation } from 'react-router-dom'

import { path } from '@/app/router/path'
import CardMemoLogoGolden from '@/assets/icons/svg/CardMemo/CardMemoLogoGolden'
import CardMemoMiniLogoCards from '@/assets/icons/svg/CardMemo/CardMemoMiniLogoCards'
import LogOut from '@/assets/icons/svg/LogOut'
import PersonOutline from '@/assets/icons/svg/PersonOutline'
import CardMemoLogoGoldenPng from '@/assets/img/cardMemoLogoGolden.png'
import LocaleSwitcherDrop from '@/components/ui/LocaleSwitcher/ui/LocaleSwitcherDrop'
import Typography from '@/components/ui/Typography/Typography'
import ChangeTheme from '@/components/ui/changeTheme/ChangeTheme'
import DropdownMenuDemo from '@/components/ui/dropDown/DropDown'
import DropDownItem from '@/components/ui/dropDown/DropDownItem'
import { useLogoutMutation } from '@/features/auth/services/auth.service'
import { MeResponse } from '@/features/auth/services/auth.types'
import clsx from 'clsx'

import style from './Header.module.scss'

type HeaderProps = {
  data?: MeResponse
}
const Header = ({ data }: HeaderProps) => {
  const [logout] = useLogoutMutation()
  const { t } = useTranslation()
  const logoutHandler = () => {
    localStorage.removeItem('deckQuery')
    logout()
  }
  const location = useLocation()
  const setDeckQueryHandler = () => {
    localStorage.setItem('deckQuery', location.search)
  }
  const theme = localStorage.getItem('theme')

  const isSmallScreen = useMediaQuery({ query: '(max-width: 480px)' })

  return (
    <div className={clsx(style.box, theme === 'sun' ? style.sun : '')}>
      <div className={style.wrapper}>
        <div className={style.boxImg}>
          <Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>
            <div className={'step-go-home'}>
              {isSmallScreen ? (
                <CardMemoMiniLogoCards className={style.img} />
              ) : (
                <CardMemoLogoGolden className={style.img} />
              )}
              <img
                alt={'cardMemoLogoGoldenPng'}
                className={style.imgHidden}
                src={CardMemoLogoGoldenPng}
              />
            </div>
          </Typography>
          <div className={'step-select-language'}>
            <LocaleSwitcherDrop />
          </div>

          <div className={'step-change-theme'}>
            <ChangeTheme />
          </div>
        </div>
        {data && (
          <div className={style.profile}>
            <Typography as={Link} className={style.name} to={`${path.profile}`} variant={'h2'}>
              {data.name}
            </Typography>
            <div className={'step-profile-drop-down'}>
              <DropdownMenuDemo className={style.dropDown} data={data} type={'head'}>
                <DropDownItem
                  handleOnClick={setDeckQueryHandler}
                  href={`${path.profile}`}
                  icon={<PersonOutline />}
                  text={t('header.myProfile')}
                />
                <DropDownItem
                  handleOnClick={logoutHandler}
                  href={`${path.login}`}
                  icon={<LogOut />}
                  text={t('header.signOut')}
                />
              </DropdownMenuDemo>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
