import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { path } from '@/router/path'

type Props = {
  open: boolean
}

export const SuccessModal = ({ open }: Props) => {
  return (
    <>
      <Modal onOpenChange={() => {}} open={open} title={'Password changed successfully'}>
        <Button as={'a'} fullWidth href={path.login} style={{ textDecoration: 'none' }}>
          <Typography variant={'body2'}>Return to login</Typography>
        </Button>
      </Modal>
    </>
  )
}
