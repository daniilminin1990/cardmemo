import { handleToastError } from '@/common/consts/toastVariants'

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
  if (result.error && result.error.status === 400) {
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
      handleToastError(`Try again later`)
    }
  }
  if (result.error && result.error.status === 'FETCH_ERROR') {
    throw new Error()
  }
}
