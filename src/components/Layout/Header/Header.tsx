import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import ellipseIcon from '@/assets/icons/WhiteSVG/Ellipse 1.svg'
import headerIcon1 from '@/assets/icons/WhiteSVG/Layer 2.svg'
import headerIcon from '@/assets/icons/WhiteSVG/person-outline.svg'
import CardMemoLogoGolden from '@/assets/icons/svg/CardMemo/CardMemoLogoGolden'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import ChangeTheme from '@/components/ui/changeTheme/ChangeTheme'
import LocaleSwitcherDrop from '@/localeSwitcher/localeSwitcherDrop'
import { path } from '@/router/path'
import { useLogoutMutation } from '@/services/auth/auth.service'
import { MeResponse } from '@/services/auth/auth.types'

import style from './Header.module.scss'

//! Прокинул data
type HeaderProps = {
  data?: MeResponse
}
const Header = ({ data }: HeaderProps) => {
  const [logout] = useLogoutMutation()
  const { t } = useTranslation()
  const logoutHandler = () => {
    logout()
  }

  return (
    <div className={style.box}>
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

            <DropdownMenuDemo
              className={style.dropDown}
              data={data}
              icon={ellipseIcon}
              type={'head'}
            >
              <DropDownItem
                href={`${path.profile}`}
                icon={headerIcon}
                text={t('header.myProfile')}
              />
              <DropDownItem
                handleOnClick={logoutHandler}
                href={`${path.login}`}
                icon={headerIcon1}
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
