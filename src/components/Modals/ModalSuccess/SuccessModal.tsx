import { memo } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { path } from '@/router/path'
import { router } from '@/router/router'

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
        onOpenChange={handleOnClose}
        open={open}
        style={{ width: '420px' }}
        title={'Password changed successfully'}
      >
        <div style={{ padding: '20px 24px' }}>
          <Button as={'a'} fullWidth href={path.login} style={{ textDecoration: 'none' }}>
            <Typography variant={'body2'}>Return to login</Typography>
          </Button>
        </div>
      </Modal>
    </>
  )
})
