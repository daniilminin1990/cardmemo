import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { TextField } from '@/common/components/textfield/textfield'
import Typography from '@/common/components/typography/typography'
import { useResetPasswordMutation } from '@/features/auth/api/authApi'
import { ResetPasswordFormValues, ResetPasswordSchema } from '@/features/auth/model/authZod.schemes'
import { SuccessModal } from '@/features/auth/ui/createNewPassword/successModal'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './createNewPassword.module.scss'

export const CreateNewPassword = () => {
  const { control, handleSubmit } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const { token = '' } = useParams()

  const [resetPassword] = useResetPasswordMutation()

  const [open, setOpen] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    await resetPassword({ password: data.newPassword, token })
      .then(() => {
        setOpen(true)
      })
      .catch(() => {
        alert('Password reset failed')
      })
  }

  return (
    <>
      <SuccessModal open={open} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={s.card}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              Create New Password
            </Typography>
          </div>
          <div className={s.box}>
            <TextField
              className={s.inputStyle}
              control={control}
              label={'New Password'}
              name={'newPassword'}
              type={'password'}
            />
            <TextField
              className={s.inputStyle}
              control={control}
              label={'Confirm New Password'}
              name={'confirmNewPassword'}
              type={'password'}
            />
          </div>

          <Button fullWidth>Confirm</Button>
        </Card>
      </form>
    </>
  )
}
