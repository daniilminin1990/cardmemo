import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'

import s from './modalsMinin.module.scss'

import { Deck } from '../../../services/decks/deck.types'
import { useDeleteDeckMutation } from '../../../services/flashCardsAPI'

type Props = {
  item: Deck
  open: boolean
  setIsDeleteModal: (value: boolean) => void
}
export const ModalDeleteDeckMinin = (props: Props) => {
  const { item, open, setIsDeleteModal } = props
  const [deleteDeck] = useDeleteDeckMutation()
  const onDeleteDeckHandler = () => {
    deleteDeck({ id: item.id })
    setIsDeleteModal(true)
  }

  return (
    <Modal onOpenChange={() => setIsDeleteModal(false)} open={open} title={'Delete Deck'}>
      <div className={s.body}>
        <Typography variant={'h1'}>{item.name}</Typography>
        <Typography variant={'body1'}>
          Do you really want to delete deck? All cards will be deleted.
        </Typography>
      </div>
      <div className={s.footer}>
        <Button onClick={() => setIsDeleteModal(false)} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={onDeleteDeckHandler} variant={'primary'}>
          Delete deck
        </Button>
      </div>
    </Modal>
  )
}
