import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { PersonalInfoFormValue, PersonalInfoScheme } from '@/common/zodSchemas/auth/auth.schemas'
import { useMeQuery, useUpdateUserDataMutation } from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

export const useProfilePage = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<PersonalInfoFormValue>({
    mode: 'onSubmit',
    resolver: zodResolver(PersonalInfoScheme),
  })

  const { data: me, isFetching, isLoading } = useMeQuery()
  const [updateUserData, { isLoading: isUpdateLoading }] = useUpdateUserDataMutation()

  const [isEditNickName, setEditNickName] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = data => {
    updateUserData({ name: data.nickName }).then(() => {
      setEditNickName(false)
    })
  }

  const loadingStatus = isLoading || isUpdateLoading || isFetching

  return {
    control,
    handleSubmit,
    isEditNickName,
    loadingStatus,
    me,
    onSubmit,
    setEditNickName,
    t,
  }
}
