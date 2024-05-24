import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { path } from '@/app/routing/path'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import Checkbox from '@/common/components/checkbox/checkbox'
import Typography from '@/common/components/typography/typography'
import { useNavigation } from '@/common/hooks/useNavigation'
import { useLoginMutation } from '@/features/auth/api/authApi'
import { SignInFormValues, SignInSchema } from '@/features/auth/model/authZod.schemes'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'

export const SignIn = () => {
  const { control, handleSubmit, register } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onSubmit',
    resolver: zodResolver(SignInSchema),
  })

  const [login] = useLoginMutation()

  const { goTo } = useNavigation()

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { email, password, rememberMe } = data

    login({ email, password, rememberMe })
      .unwrap()
      .then(() => {
        goTo(path.decks)
      })
  }

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              Sign In
            </Typography>
          </div>
          <div className={s.box}>
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={'Email'}
              name={'email'}
              placeholder={'Email'}
              type={'text'}
            />
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={'Password'}
              name={'password'}
              placeholder={'Password'}
              type={'password'}
            />
            <Checkbox className={s.checkbox} {...register('rememberMe')} label={'RememberMe'} />
            <Typography
              as={'a'}
              className={s.typographyForgotTitle}
              href={path.recoverPassword}
              variant={'body2'}
            >
              Forgot Password?
            </Typography>
          </div>
          <Button fullWidth>Sign In</Button>
          <div className={s.footer}>
            <Typography className={s.typographyFooterTitle} variant={'body2'}>
              Don`t have an account?
            </Typography>
            <Typography
              as={'a'}
              className={s.typographyFooterSubtitle}
              href={path.signUp}
              variant={'link1'}
            >
              Sign Up
            </Typography>
          </div>
        </form>
      </Card>
    </>
  )
}
