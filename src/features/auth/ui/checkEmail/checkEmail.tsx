import { useLocation } from 'react-router-dom'

import { path } from '@/app/routing/path'
import CheckEmailIcon from '@/assets/icons/svg/CheckEmailIcon'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import Typography from '@/common/components/typography/typography'

import s from './checkEmail.module.scss'

export const CheckEmail = () => {
  const location = useLocation()

  const email = location.pathname.split('/').pop() || ''

  return (
    <Card className={s.card}>
      <div className={s.container}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Check Email
        </Typography>
        <div>
          <CheckEmailIcon className={s.checkEmailIcon} />
        </div>
        <Typography as={'h2'} className={s.subtitle} variant={'body2'}>
          We’ve sent an Email with instructions to
        </Typography>
        <Typography as={'h2'} className={s.textEmail} variant={'body2'}>
          {email}
        </Typography>
        <Button as={'a'} className={s.submitBtn} fullWidth href={path.login}>
          <Typography as={'span'} variant={'subtitle2'}>
            Back to Sign In
          </Typography>
        </Button>
      </div>
    </Card>
  )
}
