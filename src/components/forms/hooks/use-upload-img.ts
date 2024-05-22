import { useState } from 'react'

import defImg from '@/assets/img/defaultCard.jpg'

type FieldError = {
  message?: string
}

type UploadImgType<TFieldValues extends any> = {
  getFieldState: (name: TFieldValues) => { error?: FieldError }
  name: TFieldValues
  resetField: (name: TFieldValues) => void
  setValue: (name: TFieldValues, value: any) => void
  trigger: (name: TFieldValues) => Promise<boolean>
  watch: (name: TFieldValues) => any
}

export const useUploadImg = <TFieldValues extends any>({
  getFieldState,
  name,
  resetField,
  setValue,
  trigger,
  watch,
}: UploadImgType<TFieldValues>) => {
  const [downloaded, setDownloaded] = useState<null | string>(null)
  const [coverError, setCoverError] = useState<null | string>(null)

  const deleteCoverHandler = () => {
    if (coverError) {
      setCoverError(null)
    }
    // toast.warning('You deleted cover', { containerId: 'modal' })
    setValue(name, null)
    setDownloaded(null)
  }

  const extraActions = async () => {
    const success = await trigger(name)
    const { error } = getFieldState(name)
    const file = watch(name)

    if (!success && error?.message) {
      // toast.error(error.message, { containerId: 'modal' })
      setCoverError(error.message)
      resetField(name)
    }

    if (file) {
      const img = success ? URL.createObjectURL(file) : defImg

      setDownloaded(img)

      if (coverError && !error?.message) {
        setCoverError(null)
      }
    }
  }

  return { coverError, deleteCoverHandler, downloaded, extraActions }
}
