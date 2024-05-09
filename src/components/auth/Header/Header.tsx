import ellipseIcon from '@/assets/icons/WhiteSVG/Ellipse 1.svg'
import headerIcon1 from '@/assets/icons/WhiteSVG/Layer 2.svg'
import headerIcon from '@/assets/icons/WhiteSVG/person-outline.svg'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'

import style from './Header.module.scss'

import logo from '../../../assets/img/Logo.png'
const Header = () => {
  return (
    <div className={style.box}>
      <div className={style.boxImg}>
        <img alt={''} src={logo} />
      </div>
      <div className={style.dropDown}>
        <div className={style.text}>Ivan</div>
        <DropdownMenuDemo icon={ellipseIcon} type={'head'}>
          <DropDownItem icon={headerIcon} text={'My Profile'} />
          <DropDownItem icon={headerIcon1} text={'My Profile'} />
        </DropdownMenuDemo>
      </div>
    </div>
  )
}

export default Header
