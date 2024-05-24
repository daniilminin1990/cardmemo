import { path } from '@/app/routing/path'
import { Button } from '@/common/components/button'
import DropdownMenuDemo from '@/common/components/dropDown/dropDown'
import DropDownItem from '@/common/components/dropDown/dropDownItem'
import { useNavigation } from '@/common/hooks/useNavigation'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api/authApi'

import style from './header.module.scss'

import logo from '../../../assets/img/Logo.png'
type HeaderProps = {
  isAuth: boolean
}
const Header = ({ isAuth }: HeaderProps) => {
  const { goTo } = useNavigation()

  const { data: me } = useMeQuery()
  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout()
      .then(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        goTo(path.login)
      })
      .catch(() => {
        console.log('Logout failed')
      })
  }

  return (
    <div className={style.box}>
      <div className={style.boxImg} onClick={() => goTo(path.decks)}>
        <img alt={'logo'} className={style.img} src={logo} />
      </div>
      {isAuth && me ? (
        <div className={style.dropDown}>
          <div className={style.text}>{me.name}</div>
          <DropdownMenuDemo email={me.email} icon={me?.avatar} name={me.name} type={'head'}>
            <div onClick={() => goTo(path.profile)}>
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
