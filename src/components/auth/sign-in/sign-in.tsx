import { SubmitHandler, useForm } from 'react-hook-form'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  password: z.string().nonempty('Enter password'),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof signInSchema>

export const SignIn = () => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = data => console.log(data)

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
            <Typography as={'label'} className={s.typographyForgotTitle} variant={'body2'}>
              Forgot Password?
            </Typography>
          </div>
          <Button fullWidth>Sign In</Button>
          <div className={s.footer}>
            <Typography as={'label'} className={s.typographyFooterTitle} variant={'body2'}>
              Don't have an account?
            </Typography>
            <Typography className={s.typographyFooterSubtitle} variant={'link1'}>
              Sign Up
            </Typography>
          </div>
        </form>
      </Card>
    </>
  )
}
