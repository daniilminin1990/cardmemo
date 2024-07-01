import { ModalKey, useModal } from '@/common/hooks/useModal'
import { ModalAddEditDeck } from '@/components/Modals/ModalAddEditDeck/ModalAddEditDeck'
import { Deck } from '@/services/decks/deck.types'

type Props = {
  item?: Deck
}

export const AddEditDeck = ({ item }: Props) => {
  const {
    contextModalKey,
    isOpen: isOpenAddDeck,
    setOpen: setOpenAddDeck,
  } = useModal(ModalKey.AddDeck)

  const { isOpen: isOpenEditDeck, setOpen: setOpenEditDeck } = useModal(ModalKey.EditDeck)

  return (
    <>
      {contextModalKey === ModalKey.AddDeck && (
        <ModalAddEditDeck open={isOpenAddDeck} setOpen={setOpenAddDeck} />
      )}
      {contextModalKey === ModalKey.EditDeck && (
        <ModalAddEditDeck item={item} open={isOpenEditDeck} setOpen={setOpenEditDeck} />
      )}
    </>
  )
}
