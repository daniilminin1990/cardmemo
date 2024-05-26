import { useForm } from 'react-hook-form'

import CheckEmailIcon from '@/assets/icons/svg/CheckEmailIcon'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { path } from '@/router/path'

import s from './checkEmail.module.scss'

type Props = {}

export const CheckEmail = ({}: Props) => {
  const { handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  const onInvalidSubmit = async (data: any) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
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
            example@mail.com
          </Typography>
          <Button as={'a'} className={s.submitBtn} fullWidth href={`${path.login}`}>
            <Typography as={'span'} variant={'subtitle2'}>
              Back to Sign In
            </Typography>
          </Button>
        </div>
      </form>
    </Card>
  )
}
