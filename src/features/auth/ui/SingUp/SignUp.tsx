import { Link } from 'react-router-dom'

import { path } from '@/app/router/path'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { useSignUp } from '@/features/auth/lib/hook/useSignUp'

import s from './SignUp.module.scss'

export default function SignUp() {
  const { control, handleSubmit, onSubmit, t } = useSignUp()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={s.card}>
        <div className={s.header}>
          <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
            {t('signUp.signUp')}
          </Typography>
        </div>
        <div className={s.box}>
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={t('signUp.email')}
            name={'email'}
            placeholder={'Input'}
            type={'text'}
          />
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={t('signUp.password')}
            name={'password'}
            placeholder={'Input'}
            type={'password'}
          />
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={t('signUp.confirmPassword')}
            name={'confirmPassword'}
            placeholder={'Input'}
            type={'password'}
          />
        </div>

        <Button fullWidth>{t('signUp.submit')}</Button>
        <div className={s.footer}>
          <Typography as={'label'} className={s.typographyFooterTitle} variant={'body2'}>
            {t('signUp.haveAccount')}
          </Typography>

          <Typography
            as={Link}
            className={s.typographyFooterSubtitle}
            to={`${path.login}`}
            variant={'link1'}
          >
            {t('signUp.signIn')}
          </Typography>
        </div>
      </Card>
    </form>
  )
}
