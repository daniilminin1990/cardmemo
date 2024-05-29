import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={s.card}>
        <div className={s.header}>
          <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
            Sign Up
          </Typography>
        </div>
        <div className={s.box}>
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Input'}
            type={'text'}
          />
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'Input'}
            type={'password'}
          />
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            placeholder={'Input'}
            type={'password'}
          />
        </div>

        <Button fullWidth>Submit</Button>
        <div className={s.footer}>
          <Typography as={'label'} className={s.typographyFooterTitle} variant={'body2'}>
            Already have an account?
          </Typography>

          <Typography
            as={Link}
            className={s.typographyFooterSubtitle}
            to={`${path.login}`}
            variant={'link1'}
          >
            Sign In
          </Typography>
        </div>
      </Card>
    </form>
  )
}
