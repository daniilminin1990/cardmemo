import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ResetPasswordFormValues, ResetPasswordSchema } from '@/common/zodSchemas/auth/auth.schemas'
import { useResetPasswordMutation } from '@/features/auth/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

export function UseCreateNewPassword() {
  const { control, handleSubmit } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const { token = '' } = useParams()

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const [open, setOpen] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    await resetPassword({ password: data.newPassword, token }).then(() => {
      setOpen(true)
    })
  }

  return {
    control,
    handleSubmit,
    isLoading,
    onSubmit,
    open,
    resetPassword,
    setOpen,
  }
}
