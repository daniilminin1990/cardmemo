import ellipseIcon from '@/assets/icons/WhiteSVG/Ellipse 1.svg'
import headerIcon1 from '@/assets/icons/WhiteSVG/Layer 2.svg'
import headerIcon from '@/assets/icons/WhiteSVG/person-outline.svg'
import FlashCardsLogo1 from '@/assets/icons/svg/FlashCardsLogo1'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
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
  const logoutHandler = () => {
    logout()
  }

  return (
    <div className={style.box}>
      <div className={style.wrapper}>
        <div className={style.boxImg}>
          {/*! Сделал ссылку на главную страницу*/}
          <Typography as={'a'} href={`${path.decks}`} variant={'body2'}>
            <FlashCardsLogo1 className={style.img} />
          </Typography>
        </div>
        {data ? (
          <div className={style.dropDown}>
            <div className={style.text}>{data.name}</div>
            <DropdownMenuDemo data={data} icon={ellipseIcon} type={'head'}>
              <DropDownItem href={`${path.profile}`} icon={headerIcon} text={'My Profile'} />
              <DropDownItem
                handleOnClick={logoutHandler}
                href={`${path.login}`}
                icon={headerIcon1}
                text={'Sign Out'}
              />
            </DropdownMenuDemo>
          </div>
        ) : (
          <div className={style.buttonBox}>
            <Button className={style.button}>Sign In</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
