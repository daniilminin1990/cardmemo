import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SignInFormValues, SignInSchema } from '@/common/zodSchemas/auth/auth.schemas'
import { useLoginMutation, useMeQuery } from '@/features/auth/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

export function useSignIn() {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onSubmit',
    resolver: zodResolver(SignInSchema),
  })
  const [signIn] = useLoginMutation()
  const onSubmit: SubmitHandler<SignInFormValues> = data => {
    signIn(data)
  }
  const { data: me } = useMeQuery()

  return {
    control,
    handleSubmit,
    me,
    onSubmit,
    t,
  }
}
