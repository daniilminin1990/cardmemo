import { Link } from 'react-router-dom'

import { path } from '@/app/router/path'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { useForgotPassword } from '@/features/auth/lib/hook/useForgotPassword'

import s from './forgotPassword.module.scss'

export const ForgotPassword = () => {
  const { control, handleSubmit, isLoading, onSubmit, t } = useForgotPassword()

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
