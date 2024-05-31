import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { SignUpFormValues, SignUpSchema } from '@/common/zodSchemas/auth/auth.schemas'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { path } from '@/router/path'
import { useSignUpMutation } from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './SignUp.module.scss'

export default function SignUp() {
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(SignUpSchema),
  })

  const [signUp] = useSignUpMutation()

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { email, password } = data

    signUp({ email, password })
  }
  const { t } = useTranslation()

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
