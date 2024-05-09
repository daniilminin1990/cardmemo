import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

const signInSchema = z.object({
  email: z.string().trim().email('Please enter a valid email'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
  rememberMe: z.literal(true, {
    errorMap: () => ({
      message: 'Please check the box',
    }),
  }),
})

type FormValues = z.infer<typeof signInSchema>

export const SignIn = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = handleSubmit((data: FormValues) => {
    console.log(data)
  })

  console.log(errors) // Just for vercel not to yell at me

  return (
    <Card className={s.root}>
      <form onSubmit={onSubmit}>
        <FormTextfield className={s.input} control={control} label={'Email'} name={'email'} />
        <FormTextfield
          className={s.input}
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Checkbox className={s.checkbox} {...register('rememberMe')} label={'RememberMe'} />
        <Button type={'submit'}> Submit </Button>
      </form>
    </Card>
  )
}
