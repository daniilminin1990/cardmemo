import { Link, useParams } from 'react-router-dom'

import CheckEmailIcon from '@/assets/icons/svg/CheckEmailIcon'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import s from './checkEmail.module.scss'

export const CheckEmail = () => {
  const { email } = useParams<{ email: string }>()

  return (
    <div className={s.container}>
      <Card>
        <div className={s.content}>
          <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
            Check Email
          </Typography>
          <div className={s.imageContainer}>
            <CheckEmailIcon />
          </div>
          <div className={s.notification}>
            <Typography variant={'body2'}>We’ve sent an Email with instructions to</Typography>
            <Typography variant={'body2'}>{email}</Typography>
          </div>
          <Button as={Link} className={s.backBtn} fullWidth to={'/login'}>
            Back to Sign in
          </Button>
        </div>
      </Card>
    </div>
  )
}
