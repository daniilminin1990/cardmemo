import { Link } from 'react-router-dom'

import LogOut from '@/assets/icons/svg/LogOut'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { useLogoutBtn } from '@/features/profile/lib/hooks/useLogoutBtn'

import s from './LogoutBtn.module.scss'

export const LogoutBtn = () => {
  const { goToLogin, logoutHandler, t } = useLogoutBtn()

  return (
    <Button
      as={Link}
      className={s.logoutBtn}
      onClick={logoutHandler}
      to={goToLogin}
      variant={'secondary'}
    >
      <LogOut />
      <Typography variant={'body2'}>{t('profilePage.logout')}</Typography>
    </Button>
  )
}
