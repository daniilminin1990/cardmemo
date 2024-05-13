import { SubmitHandler, useForm } from 'react-hook-form'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

const createNewPassScheme = z.object({
  password: z.string().min(1, 'Type new password'),
})

type FormValue = z.infer<typeof createNewPassScheme>

export const CreateNewPassword = () => {
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(createNewPassScheme),
  })

  const onSubmit: SubmitHandler<FormValue> = data => console.log(data)

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              Create new password
            </Typography>
          </div>
          <div className={s.box}>
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={'Password'}
              name={'password'}
              placeholder={'Type new password'}
              type={'password'}
            />
            <Typography as={'label'} className={s.typographyForgotTitle} variant={'body2'}>
              Create new password and we will send you further instructions to email
            </Typography>
          </div>
          <Button fullWidth>
            <Typography variant={'body2'}>Create New Password</Typography>
          </Button>
        </form>
      </Card>
    </>
  )
}
