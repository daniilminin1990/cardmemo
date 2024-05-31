import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { emailRecoveringTemplate as html } from '@/common/consts/email-recovering-template'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { path } from '@/router/path'
import { useRecoverPasswordMutation } from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string().nonempty('Required').email(),
})

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>

export const ForgotPassword = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormType>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const navigate = useNavigate()
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const onSubmit = async ({ email }: ForgotPasswordFormType) => {
    await recoverPassword({ email, html }).unwrap()
    navigate(`${path.checkEmail}/${email}`)
  }
  const { t } = useTranslation()

  return (
    <div className={s.container}>
      {isLoading && <LoadingBar />}
      <Card>
        <section className={s.content}>
          <Typography as={'h2'} variant={'large'}>
            {t('forgotPassword.forgotPassword')}
          </Typography>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <FormTextfield
              className={s.formTextfield}
              control={control}
              label={t('forgotPassword.email')}
              name={'email'}
              placeholder={'Email'}
            />
            <Typography className={s.information} variant={'body2'}>
              {t('forgotPassword.enterYourEmail')}
            </Typography>
            <Button fullWidth>{t('forgotPassword.sendInstructions')}</Button>
          </form>
          <div className={s.register}>
            <Typography as={'button'} className={s.typographyFooterTitle} variant={'body2'}>
              {t('forgotPassword.rememberPassword')}
            </Typography>
            <Typography as={Link} className={s.signIn} to={path.login} variant={'link1'}>
              {t('forgotPassword.tryLogIn')}
            </Typography>
          </div>
        </section>
      </Card>
    </div>
  )
}
