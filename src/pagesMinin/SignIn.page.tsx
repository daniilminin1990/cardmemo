import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Page } from '@/pagesMinin/componentsMinin/Page/Page'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signInPage.module.scss'

import { useLoginMutation, useMeQuery } from '../../services/auth/auth.service'

const signInSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Enter email'),
  password: z.string().min(1, 'Enter password'),
  rememberMe: z.boolean(),
})

type FormValues = z.infer<typeof signInSchema>

export const SignInPage = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  })
  const [signIn] = useLoginMutation()
  const onSubmit: SubmitHandler<FormValues> = data => {
    signIn(data)
  }
  // ? Сделаем тут запрос me и если true, то редирект на ./, иначе отбросить ошибки incorrect data в попап меню
  const { data: me } = useMeQuery()

  if (me) {
    return <Navigate to={'/decks'} />
  }

  return (
    <Page mt={'36px'}>
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
            <Controller
              control={control}
              defaultValue={false}
              name={'rememberMe'}
              render={({ field: { onChange, value } }) => (
                <Checkbox checked={value} label={'RememberMe'} onCheckedChange={onChange} />
              )}
            />
            <Typography as={'button'} className={s.typographyForgotTitle} variant={'body2'}>
              Forgot Password?
            </Typography>
          </div>
          <Button fullWidth type={'submit'}>
            Sign In
          </Button>
          <div className={s.footer}>
            <Typography as={'button'} className={s.typographyFooterTitle} variant={'body2'}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't have an account?
            </Typography>
            <Typography as={'button'} className={s.typographyFooterSubtitle} variant={'link1'}>
              Sign Up
            </Typography>
          </div>
        </form>
      </Card>
    </Page>
  )
}
