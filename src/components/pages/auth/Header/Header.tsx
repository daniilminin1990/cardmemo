import ellipseIcon from '@/assets/icons/WhiteSVG/Ellipse 1.svg'
import headerIcon1 from '@/assets/icons/WhiteSVG/Layer 2.svg'
import headerIcon from '@/assets/icons/WhiteSVG/person-outline.svg'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/components/utils/hooks/useNavigate'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.services'

import style from './Header.module.scss'

import logo from '../../../../assets/img/Logo.png'

type HeaderProps = {
  isAuth: boolean
}
const Header = ({ isAuth }: HeaderProps) => {
  const { data: me } = useMeQuery()
  const { goTo } = useNavigation()
  const [logout] = useLogoutMutation()
  const logoutHandler = () => {
    logout().then(() => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      goTo('/login')
    })
  }

  return (
    <div className={style.box}>
      <div className={style.boxImg} onClick={() => goTo('/decks')}>
        <img alt={'logo'} className={style.img} src={logo} />
      </div>
      {isAuth && me ? (
        <div className={style.dropDown}>
          <div className={style.text}>{me.name}</div>
          <DropdownMenuDemo email={me.email} icon={me?.avatar} name={me.name} type={'head'}>
            <div onClick={() => goTo('/profile')}>
              <DropDownItem icon={me?.avatar} text={'My Profile'} />
            </div>

            <div onClick={logoutHandler}>
              <DropDownItem icon={headerIcon1} text={'Logout'} />
            </div>
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
