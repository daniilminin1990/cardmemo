import { toast } from 'react-toastify'

export const handleToastSuccess = (message: string, autoClose: number = 3000) => {
  toast.success(message, { autoClose: autoClose })
}
export const handleToastError = (message: string, autoClose: number = 3000) => {
  toast.error(message, { autoClose: autoClose })
}
export const handleToastWarning = (message: string, autoClose: number = 3000) => {
  toast.warning(message, { autoClose: autoClose })
}
