import { memo } from 'react'

import { path } from '@/app/router/path'
import { router } from '@/app/router/router'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'

import s from './SuccessModal.module.scss'
type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

export const SuccessModal = memo(({ open, setOpen }: Props) => {
  const handleOnClose = () => {
    router.navigate(path.login)
    setOpen(false)
  }

  return (
    <>
      <Modal
        className={s.modal}
        onOpenChange={handleOnClose}
        open={open}
        title={'Password changed successfully'}
      >
        <div className={s.container}>
          <Button as={'a'} className={s.btn} fullWidth href={path.login}>
            <Typography variant={'body2'}>Return to login</Typography>
          </Button>
        </div>
      </Modal>
    </>
  )
})
