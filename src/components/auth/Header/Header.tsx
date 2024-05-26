import ellipseIcon from '@/assets/icons/WhiteSVG/Ellipse 1.svg'
import headerIcon1 from '@/assets/icons/WhiteSVG/Layer 2.svg'
import headerIcon from '@/assets/icons/WhiteSVG/person-outline.svg'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'

import style from './Header.module.scss'

import { useLogoutMutation } from '../../../../services/auth/auth.service'
import { MeResponse } from '../../../../services/auth/auth.types'
import logo from '../../../assets/img/Logo.png'

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
      <div className={style.boxImg}>
        <Typography as={'a'} href={'/'} variant={'body2'}>
          <img alt={'logo'} className={style.img} src={logo} />
        </Typography>
      </div>
      {data ? (
        <div className={style.dropDown}>
          <div className={style.text}>Ivan</div>
          <DropdownMenuDemo data={data} icon={ellipseIcon} type={'head'}>
            <DropDownItem icon={headerIcon} text={'My Profile'} />
            <Button onClick={logoutHandler} style={{ all: 'unset' }}>
              <DropDownItem icon={headerIcon1} text={'Sign Out'} />
            </Button>
          </DropdownMenuDemo>
        </div>
      ) : (
        <div className={style.buttonBox}>
          <Button className={style.button}>Sign In</Button>
        </div>
      )}
    </div>
  )
}

export default Header
