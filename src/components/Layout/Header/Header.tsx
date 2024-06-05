import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import CardMemoLogoGolden from '@/assets/icons/svg/CardMemo/CardMemoLogoGolden'
import LogOut from '@/assets/icons/svg/LogOut'
import PersonOutline from '@/assets/icons/svg/PersonOutline'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import ChangeTheme from '@/components/ui/changeTheme/ChangeTheme'
import LocaleSwitcherDrop from '@/components/ui/localeSwitcher/localeSwitcherDrop'
import { path } from '@/router/path'
import { useLogoutMutation } from '@/services/auth/auth.service'
import { MeResponse } from '@/services/auth/auth.types'
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

  return (
    <div className={clsx(style.box, theme === 'sun' ? style.sun : '')}>
      <div className={style.wrapper}>
        <div className={style.boxImg}>
          {/*! Фиолетовые*/}
          {/*<Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>*/}
          {/*  <CardsMemoizeLogo className={style.img} />*/}
          {/*</Typography>*/}
          {/*<Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>*/}
          {/*  <CardsMemoizeLogoMinimalisticDolzhenkov className={style.img} />*/}
          {/*</Typography>*/}
          {/*<Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>*/}
          {/*  <CardMemoLogo className={style.img} />*/}
          {/*</Typography>*/}
          {/*<Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>*/}
          {/*  <CardMemoLogoMinimalisticGolden className={style.img} />*/}
          {/*</Typography>*/}
          {/*! Золотые*/}
          <Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>
            <CardMemoLogoGolden className={style.img} />
          </Typography>
          {/*<Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>*/}
          {/*  <CardMemoLogoMinimalisticGolden className={style.img} />*/}
          {/*</Typography>*/}
          {/*<Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>*/}
          {/*  <CardsMemoizeLogoGolden className={style.img} />*/}
          {/*</Typography>*/}
          {/*<Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>*/}
          {/*  <CardsMemoizeLogoMinimalisticGolden className={style.img} />*/}
          {/*</Typography>*/}
          {/*<Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>*/}
          {/*  <CardsMemoizeLogoMinimalisticDolzhenkovGolden className={style.img} />*/}
          {/*</Typography>*/}
          <LocaleSwitcherDrop />
          <ChangeTheme />
        </div>
        {data ? (
          <div className={style.profile}>
            <Typography as={Link} className={style.name} to={`${path.profile}`} variant={'h2'}>
              {data.name}
            </Typography>

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
        ) : (
          <div className={style.buttonBox}>
            <Button as={Link} className={style.button} to={`${path.login}`}>
              {t('header.signIn')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
