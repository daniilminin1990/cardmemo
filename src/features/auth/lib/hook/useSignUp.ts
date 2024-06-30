import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SignUpFormValues, SignUpSchema } from '@/common/zodSchemas/auth/auth.schemas'
import { useSignUpMutation } from '@/features/auth/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

export function useSignUp() {
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(SignUpSchema),
  })

  const [signUp] = useSignUpMutation()

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { email, password } = data

    signUp({ email, password })
  }
  const { t } = useTranslation()

  return {
    control,
    handleSubmit,
    onSubmit,
    t,
  }
}
