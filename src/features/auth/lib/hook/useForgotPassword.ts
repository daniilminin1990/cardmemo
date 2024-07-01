import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { path } from '@/app/router/path'
import { emailRecoveringTemplate as html } from '@/common/consts/email-recovering-template'
import {
  ForgotPasswordFormValues,
  ForgotPasswordSchema,
} from '@/common/zodSchemas/auth/auth.schemas'
import { useRecoverPasswordMutation } from '@/features/auth/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

export function useForgotPassword() {
  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const navigate = useNavigate()
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const onSubmit = async ({ email }: ForgotPasswordFormValues) => {
    await recoverPassword({ email, html }).unwrap()
    navigate(`${path.checkEmail}/${email}`)
  }
  const { t } = useTranslation()

  return {
    control,
    handleSubmit,
    isLoading,
    onSubmit,
    t,
  }
}
