import { selectIsOpen, selectModalKey } from '@/app/model'
import { toggleModal } from '@/app/model/app.slice'
import { useAppDispatch, useAppSelector } from '@/app/store/store'

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
