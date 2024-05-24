import { path } from '@/app/routing/path'
import { Button } from '@/common/components/button'
import { Modal } from '@/common/components/modal/modal'
import Typography from '@/common/components/typography/typography'

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
