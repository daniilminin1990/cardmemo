import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { path } from '@/app/routing/path'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { TextField } from '@/common/components/textfield/textfield'
import Typography from '@/common/components/typography/typography'
import { useNavigation } from '@/common/hooks/useNavigation'
import { useSignUpMutation } from '@/features/auth/api/authApi'
import { SignUpFormValues, SignUpSchema } from '@/features/auth/model/authZod.schemes'
import { zodResolver } from '@hookform/resolvers/zod'

import style from './signUp.module.scss'

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

  const { goTo } = useNavigation()

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { email, password } = data

    signUp({ email, password })
      .unwrap()
      .then(() => {
        goTo(path.login)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={style.card}>
        <div className={style.header}>
          <Typography as={'h1'} className={style.typographyHead} variant={'h1'}>
            Sign Up
          </Typography>
        </div>
        <div className={style.box}>
          <TextField
            className={style.inputStyle}
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Input'}
            type={'text'}
          />
          <TextField
            className={style.inputStyle}
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'Input'}
            type={'password'}
          />
          <TextField
            className={style.inputStyle}
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            placeholder={'Input'}
            type={'password'}
          />
        </div>

        <Button fullWidth>Submit</Button>
        <div className={style.footer}>
          <Typography as={'label'} className={style.typographyFooterTitle} variant={'body2'}>
            Already have an account?
          </Typography>

          <Typography
            as={'a'}
            className={style.typographyFooterSubtitle}
            href={path.login}
            variant={'link1'}
          >
            Sign In
          </Typography>
        </div>
      </Card>
    </form>
  )
}
