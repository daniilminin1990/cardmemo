import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { path } from '@/app/routing/path'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { TextField } from '@/common/components/textfield/textfield'
import Typography from '@/common/components/typography/typography'
import { useNavigation } from '@/common/hooks/useNavigation'
import { useRecoverPasswordMutation } from '@/features/auth/api/authApi'
import { ForgotPassFormValue, ForgotPassScheme } from '@/features/auth/model/authZod.schemes'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './recoverPassword.module.scss'

export const RecoverPassword = () => {
  const { control, handleSubmit, reset } = useForm<ForgotPassFormValue>({
    resolver: zodResolver(ForgotPassScheme),
  })

  const [recoverPassword] = useRecoverPasswordMutation()

  const { goTo } = useNavigation()

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    recoverPassword({ email: data.email })
      .unwrap()
      .then(() => {
        goTo(`${path.checkEmail}/${data.email}`)
        reset()
      })
      .catch(() => {
        console.error('Error')
      })
  }

  return (
    <Card className={s.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.container}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            Forgot your password?
          </Typography>
          <TextField
            className={s.input}
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Email'}
            type={'email'}
          />
          <Typography as={'h2'} className={s.subtitle} variant={'body2'}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={s.submitBtn} fullWidth>
            <Typography as={'span'} variant={'subtitle2'}>
              Send Instructions
            </Typography>
          </Button>
          <Typography as={'h2'} className={s.passQuest} variant={'body2'}>
            Did you remember your password?
          </Typography>
          <Button as={'a'} className={s.loginLink} href={path.login}>
            Try logging in
          </Button>
        </div>
      </form>
    </Card>
  )
}
