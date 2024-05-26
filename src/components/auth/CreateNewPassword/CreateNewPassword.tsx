import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ResetPasswordFormValues, ResetPasswordSchema } from '@/common/zodSchemas/auth/auth.schemas'
import { SuccessModal } from '@/components/auth/CreateNewPassword/SuccessModal'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { useResetPasswordMutation } from '@/services/auth/auth.service'
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
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={'New Password'}
              name={'newPassword'}
              type={'password'}
            />
            <FormTextfield
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
