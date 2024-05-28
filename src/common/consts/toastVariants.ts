import { toast } from 'react-toastify'

import { useThrottle } from '@/hooks/useThrottle'

export const handleToastSuccess = (message: string, autoClose: number = 3000) => {
  toast.success(message, { autoClose: autoClose })
}
export const handleToastError = (message: string, autoClose: number = 3000) => {
  toast.error(message, { autoClose: autoClose })
}
export const handleToastWarning = (message: string, autoClose: number = 3000) => {
  toast.warning(message, { autoClose: autoClose })
}
export const handleToastInfo = (message: string, autoClose: number = 3000) => {
  toast.info(message, { autoClose: autoClose })
}
export const throttledToastError = useThrottle(() => {
  handleToastError(`Please check the network and try again or later!`)
}, 3000)
