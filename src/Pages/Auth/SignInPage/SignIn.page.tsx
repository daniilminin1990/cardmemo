import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'

import { Page } from '@/components/ui/Page/Page'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import FormCheckbox from '@/components/ui/form/form-checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { path } from '@/router/path'
import { useLoginMutation, useMeQuery } from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signInPage.module.scss'

const signInSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Enter email'),
  password: z.string().min(1, 'Enter password'),
  rememberMe: z.boolean(),
})

type FormValues = z.infer<typeof signInSchema>

export const SignInPage = () => {
  const { t } = useTranslation()
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
  const { data: me } = useMeQuery()

  if (me) {
    return <Navigate to={`${path.decks}`} />
  }

  return (
    <Page mt={'36px'}>
      <Card className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              {t('signInPage.signIn')}
            </Typography>
          </div>
          <div className={s.box}>
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={t('signInPage.email')}
              name={'email'}
              placeholder={'Email'}
              type={'text'}
            />
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={t('signInPage.password')}
              name={'password'}
              placeholder={'Password'}
              type={'password'}
            />
            <FormCheckbox
              control={control}
              label={t('signInPage.rememberMe')}
              name={'rememberMe'}
            />
            <Typography
              as={Link}
              className={s.typographyForgotTitle}
              to={path.recoverPassword}
              variant={'body2'}
            >
              {t('signInPage.forgotPassword')}
            </Typography>
          </div>
          <Button fullWidth type={'submit'}>
            {t('signInPage.signIn')}
          </Button>
          <div className={s.footer}>
            <Typography as={'span'} className={s.typographyFooterTitle} variant={'body2'}>
              {t('signInPage.dontHaveAccount')}
            </Typography>
            <Typography
              as={Link}
              className={s.typographyFooterSubtitle}
              to={`${path.signUp}`}
              type={'button'}
              variant={'link1'}
            >
              {t('signInPage.signUp')}
            </Typography>
          </div>
        </form>
      </Card>
    </Page>
  )
}
