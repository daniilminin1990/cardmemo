import { ModalAddEditDeck } from '@/components/Modals/ModalAddEditDeck/ModalAddEditDeck'
import { ModalKey, useModal } from '@/hooks/useModal'
import { Deck } from '@/services/decks/deck.types'

type Props = {
  item?: Deck
}

export const AddEditDeck = ({ item }: Props) => {
  const { isOpen, setOpen } = useModal(ModalKey.AddEditDeck)

  return <ModalAddEditDeck item={item} open={isOpen} setOpen={setOpen} />
}
