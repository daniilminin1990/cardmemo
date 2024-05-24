import ellipseIcon from '@/assets/icons/WhiteSVG/Ellipse 1.svg'
import headerIcon1 from '@/assets/icons/WhiteSVG/Layer 2.svg'
import headerIcon from '@/assets/icons/WhiteSVG/person-outline.svg'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'

import style from './Header.module.scss'

import logo from '../../../assets/img/Logo.png'

type HeaderProps = {
  isAuth: boolean
}
const Header = ({ isAuth }: HeaderProps) => {
  return (
    <div className={style.box}>
      <div className={style.boxImg}>
        <Typography as={'a'} href={'/'}>
          <img alt={'logo'} className={style.img} src={logo} />
        </Typography>
      </div>
      {isAuth ? (
        <div className={style.dropDown}>
          <div className={style.text}>Ivan</div>
          <DropdownMenuDemo icon={ellipseIcon} type={'head'}>
            <DropDownItem icon={headerIcon} text={'My Profile'} />
            <DropDownItem icon={headerIcon1} text={'My Profile'} />
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
