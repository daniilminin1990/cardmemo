import { handleToastError, throttledToastError } from '@/common/consts/toastVariants'
import i18n from 'i18next'

export type ErrorDataType = {
  data: ErrorMessages
  status: number | string
}
export type ErrorMessages = [
  {
    field: string
    message: string
  },
]

export const failedApiResponse = (result: any) => {
  const t = i18n.t

  const { url } = result.meta.request
  const { method } = result.meta.request

  try {
    if (result) {
      if (result.error.status === 400) {
        if (`data` in result.error) {
          const errorData = result.error.data as ErrorDataType

          if (`errorMessages` in errorData) {
            const errorMessages = errorData.errorMessages as ErrorMessages

            if (errorMessages.length === 1) {
              const message = errorData.errorMessages as string

              handleToastError(message[0])
            } else {
              handleToastError(errorMessages[0].message)
            }
          }
        } else {
          handleToastError(`${t('failedApiResponse.network')}`)
        }
      }

      if (result.error.status === 401) {
        if (`data` in result.error) {
          const errorData = result.error.data as ErrorDataType

          if (`message` in errorData) {
            const errorMessage = errorData.message as string

            if (errorMessage === 'Invalid credentials') {
              handleToastError(errorMessage)
            }

            if (method === 'POST' && url.startsWith('/login')) {
              handleToastError(errorMessage)
            }
          } else {
            handleToastError(`${t('failedApiResponse.network')}`)
          }
        }
      }
    }
    if (result.error.status === 'FETCH_ERROR') {
      throttledToastError()
      throw new Error()
    }
  } catch (e) {
    ;() => {}
  }
}
