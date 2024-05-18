import { useState } from 'react'

type FieldError = {
  message?: string
}

type name = 'answerName' | 'coverAnswer' | 'coverQuestion' | 'questionName'

type UploadImgType = {
  getFieldState: (name: name) => { error?: FieldError }
  resetField: (name: name) => void
  setValue: (name: name, value: any) => void
  trigger: (name: name) => Promise<boolean>
  watch: (name: name) => any
}

export const useUploadImg = ({
  getFieldState,
  resetField,
  setValue,
  trigger,
  watch,
}: UploadImgType) => {
  const [downloaded, setDownloaded] = useState<null | string>(null)
  const [coverError, setCoverError] = useState<null | string>(null)

  const deleteCoverHandler = (cover: name) => {
    if (coverError) {
      setCoverError(null)
    }
    // toast.warning('You deleted cover', { containerId: 'modal' })
    setValue(cover, null)
    setDownloaded(null)
  }

  const extraActions = async (cover: name) => {
    const success = await trigger(cover)
    const { error } = getFieldState(cover)
    const file = watch(cover)

    if (!success && error?.message) {
      // toast.error(error.message, { containerId: 'modal' })
      setCoverError(error.message)
      resetField(cover)
    }

    if (file) {
      const badCase = null
      const img = success ? URL.createObjectURL(file) : badCase

      setDownloaded(img)

      if (coverError && !error?.message) {
        setCoverError(null)
      }
    }
  }

  return { coverError, deleteCoverHandler, downloaded, extraActions }
}
