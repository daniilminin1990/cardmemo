import { useContext } from 'react'

import { ModalContext } from '@/common/contexts/ModalProvider/ModalProvider'

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
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  const { isOpen, modalKey: contextModalKey, toggleModal } = context

  const setOpen = (open: boolean) => toggleModal(modalKey, open)

  return {
    contextModalKey,
    isOpen: isOpen && modalKey === context.modalKey,
    setOpen,
  }
}
