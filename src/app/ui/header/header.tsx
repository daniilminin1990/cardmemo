import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { path } from '@/app/routing/path'
import { Button } from '@/common/components/button'
import DropdownMenuDemo from '@/common/components/dropDown/dropDown'
import DropDownItem from '@/common/components/dropDown/dropDownItem'
import Typography from '@/common/components/typography/typography'
import { useNavigation } from '@/common/hooks/useNavigation'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api/authApi'

import style from './header.module.scss'

import logoutIcon from '../../../assets/icons/log-out-outline.svg'
import personIcon from '../../../assets/icons/person.svg'
import logo from '../../../assets/img/Logo.png'

type HeaderProps = {
  isAuth: boolean
}
const Header = ({ isAuth }: HeaderProps) => {
  const { goTo } = useNavigation()

  const { data: me } = useMeQuery()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    await logout()
      .unwrap()
      .catch(() => {
        toast.error(`Error, try again or later`)
      })
  }

  return (
    <div className={style.box}>
      <div className={style.boxImg} onClick={() => goTo(path.decks)}>
        <img alt={'logo'} className={style.img} src={logo} />
      </div>
      {isAuth && me ? (
        <div className={style.dropDown}>
          <NavLink style={{ textDecoration: 'none' }} to={`${path.profile}`}>
            <Typography className={style.name} variant={'h1'}>
              {me.name}
            </Typography>
          </NavLink>

          <DropdownMenuDemo email={me.email} icon={me.avatar} name={me.name} type={'head'}>
            <div onClick={() => goTo(path.profile)}>
              <DropDownItem icon={personIcon} text={'My Profile'} />
            </div>

            <div onClick={logoutHandler}>
              <DropDownItem icon={logoutIcon} text={'Logout'} />
            </div>
          </DropdownMenuDemo>
        </div>
      ) : (
        <div className={style.buttonBox}>
          <NavLink className={style.link} to={`${path.login}`}>
            <Button variant={'secondary'}>Sign In</Button>
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Header
