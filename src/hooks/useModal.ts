import { selectIsOpen, selectModalKey } from '@/services/modal'
import { toggleModal } from '@/services/modal/modal.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

export enum ModalKey {
  AddCard = 'AddCard',
  AddDeck = 'AddDeck',
  DeleteCard = 'DeleteCard',
  DeleteDeck = 'DeleteDeck',
  EditCard = 'EditCard',
  EditDeck = 'EditDeck',
  Empty = 'Empty',
}

export const useModal = (modalKey: ModalKey) => {
  const isOpenModal = useAppSelector(selectIsOpen)
  const contextModalKey = useAppSelector(selectModalKey)
  const dispatch = useAppDispatch()

  const setOpen = (open: boolean) => {
    dispatch(toggleModal({ key: modalKey, open }))
  }
  const isOpen = isOpenModal && modalKey === contextModalKey

  return {
    contextModalKey,
    isOpen,
    setOpen,
  }
}
