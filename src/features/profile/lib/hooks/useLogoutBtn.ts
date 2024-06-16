import { useTranslation } from 'react-i18next'

import { path } from '@/router/path'
import { useLogoutMutation } from '@/services/auth/auth.service'

export const useLogoutBtn = () => {
  const { t } = useTranslation()

  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    localStorage.removeItem('deckQuery')
    await logout()
  }

  const goToLogin = `${path.login}`

  return {
    goToLogin,
    logoutHandler,
    t,
  }
}
