import { SubmitHandler, useController, useForm } from 'react-hook-form'

import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import style from '@/components/auth/sign-up/SignUp.module.scss'

type FormValue = {
  login: string
  password: string
  rememberMe: boolean
}

export default function LoginForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValue>()
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    name: 'rememberMe',
  })
  const onSubmit: SubmitHandler<FormValue> = data => console.log(data)

  // 123
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={style.card}>
        <Typography as={'h1'} className={style.typography} variant={'h1'}>
          Sign Up
        </Typography>
        <h1>Sign Up</h1>
        <div className={style.box}>
          <Input
            {...register('login', { required: true })}
            disabled={false}
            error={errors.login?.message}
            label={'Login'}
            placeholder={'Login'}
            type={'text'}
          />

          <Input
            {...register('password', { required: true })}
            disabled={false}
            error={errors.password?.message}
            label={'Password'}
            placeholder={'Password'}
            type={'password'}
          />
          <Input
            {...register('password', { required: true })}
            disabled={false}
            error={errors.password?.message}
            label={'Confirm Password'}
            placeholder={'Password'}
            type={'password'}
          />
        </div>

        <Button className={style.button} fullWidth>
          Submit
        </Button>
        <div className={style.footer}>
          <Typography as={'label'}>Already have an account?</Typography>
          <Typography as={'h2'} variant={'link2'}>
            Sign In
          </Typography>
        </div>
      </Card>
    </form>
  )
}
