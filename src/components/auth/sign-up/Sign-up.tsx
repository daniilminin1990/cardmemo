import { SubmitHandler, useForm } from 'react-hook-form'

import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import style from '@/components/auth/sign-up/SignUp.module.scss'

type FormValue = {
  confirmPassword: string
  login: string
  password: string
}

export default function SignUp() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValue>()

  const onSubmit: SubmitHandler<FormValue> = data => console.log(data)

  // 123
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={style.card}>
        <div className={style.header}>
          <Typography as={'h1'} className={style.typographyHead} variant={'h1'}>
            Sign Up
          </Typography>
        </div>
        <div className={style.box}>
          <Input
            {...register('login', { required: true })}
            className={style.inputStyle}
            disabled={false}
            error={errors.login?.message}
            label={'Login'}
            placeholder={'Login'}
            type={'text'}
          />
          <Input
            {...register('password', { required: true })}
            className={style.inputStyle}
            disabled={false}
            error={errors.password?.message}
            label={'Password'}
            placeholder={'Password'}
            type={'password'}
          />
          <Input
            {...register('confirmPassword', { required: true })}
            className={style.inputStyle}
            disabled={false}
            error={errors.password?.message}
            label={'Confirm Password'}
            placeholder={'Password'}
            type={'password'}
          />
        </div>

        <Button fullWidth>Submit</Button>
        <div className={style.footer}>
          <Typography as={'label'} className={style.typographyFooterTitle} variant={'body2'}>
            Already have an account?
          </Typography>
          <Typography className={style.typographyFooterSubtitle} variant={'link1'}>
            Sign In
          </Typography>
        </div>
      </Card>
    </form>
  )
}
