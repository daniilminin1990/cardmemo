import { ModalAddEditCard } from '@/components/Modals/ModalEditCard/ModalAddEditCard'
import { CardResponse } from '@/features/cards/api/cardsApi.types'
import { ModalKey, useModal } from '@/hooks/useModal'

type Props = {
  item?: CardResponse
}

export const AddEditCard = ({ item }: Props) => {
  const {
    contextModalKey,
    isOpen: isOpenAddCard,
    setOpen: setOpenAddCard,
  } = useModal(ModalKey.AddCard)

  const { isOpen: isOpenEditCard, setOpen: setOpenEditCard } = useModal(ModalKey.EditCard)

  return (
    <>
      {contextModalKey === ModalKey.AddCard && (
        <ModalAddEditCard open={isOpenAddCard} setOpen={setOpenAddCard} />
      )}
      {contextModalKey === ModalKey.EditCard && (
        <ModalAddEditCard item={item} open={isOpenEditCard} setOpen={setOpenEditCard} />
      )}
    </>
  )
}
