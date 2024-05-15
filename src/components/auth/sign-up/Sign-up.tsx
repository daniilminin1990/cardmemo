import { SubmitHandler, useForm } from 'react-hook-form'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from '@/components/auth/sign-up/SignUp.module.scss'

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }

    return data
  })

type FormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = data => console.log(data)

  // 123
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={style.card}>
        <div className={style.header}>
          <Typography as={'h1'} className={style.typographyHead} variant={'h1'}>
            Sign Up
          </Typography>
        </div>
        <div className={style.box}>
          <FormTextfield
            className={style.inputStyle}
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Input'}
            type={'text'}
          />
          <FormTextfield
            className={style.inputStyle}
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'Input'}
            type={'password'}
          />
          <FormTextfield
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
          <Typography className={style.typographyFooterSubtitle} variant={'link1'}>
            Sign In
          </Typography>
        </div>
      </Card>
    </form>
  )
}
