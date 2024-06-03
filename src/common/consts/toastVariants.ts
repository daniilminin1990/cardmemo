import { toast } from 'react-toastify'

import { useThrottle } from '@/hooks/useThrottle'

import s from '../../styles/toastStyles.module.scss'

export const handleToastSuccess = (message: string, autoClose: number = 3000) => {
  toast.success(message, {
    autoClose,
    className: s.success,
    progressClassName: s.progressSuccess,
  })
}
export const handleToastError = (message: string, autoClose: number = 3000) => {
  toast.error(message, { autoClose, className: s.error, progressClassName: s.progressError })
}
export const handleToastWarning = (message: string, autoClose: number = 3000) => {
  toast.warning(message, { autoClose, className: s.warning, progressClassName: s.progressWarning })
}
export const handleToastInfo = (message: string, autoClose: number = 3000) => {
  toast.info(message, {
    autoClose,
    className: s.info,
    progressClassName: s.progressInfo,
  })
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export const throttledToastError = useThrottle(() => {
  handleToastError(`Please check the network and try again or later!`)
}, 3000)
