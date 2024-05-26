import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { useDeleteCardByIdMutation } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'

import s from './modals.module.scss'

type Props = {
  item: CardResponse
  open: boolean
  setIsDeleteModal: (value: boolean) => void
}
export const ModalDeleteCard = (props: Props) => {
  const { item, open, setIsDeleteModal } = props
  const [deleteCard] = useDeleteCardByIdMutation()
  const onDeleteDeckHandler = () => {
    deleteCard({ id: item.id })
    setIsDeleteModal(true)
  }

  return (
    <Modal onOpenChange={() => setIsDeleteModal(false)} open={open} title={'Delete Card'}>
      <div className={s.body}>
        <Typography variant={'h1'}>{item.question}</Typography>
        <Typography variant={'body1'}>
          Do you really want to delete card? Cards will be deleted !!!
        </Typography>
      </div>
      <div className={s.footer}>
        <Button onClick={() => setIsDeleteModal(false)} variant={'secondary'}>
          <Typography variant={'subtitle2'}>Cancel</Typography>
        </Button>
        <Button onClick={onDeleteDeckHandler} variant={'primary'}>
          <Typography variant={'subtitle2'}>Delete card</Typography>
        </Button>
      </div>
    </Modal>
  )
}
