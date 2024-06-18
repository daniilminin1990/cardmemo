import { ReactNode, createContext, useState } from 'react'

import { ModalKey } from '@/hooks/useModal'

// Создаем интерфейс для контекста модального окна
interface ModalContextProps {
  isOpen: boolean
  modalKey: ModalKey | null
  toggleModal: (key: ModalKey, open: boolean) => void
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalKey, setModalKey] = useState<ModalKey | null>(null)

  const toggleModal = (key: ModalKey, open: boolean) => {
    setIsOpen(open)
    setModalKey(open ? key : null)
  }

  return (
    <ModalContext.Provider value={{ isOpen, modalKey, toggleModal }}>
      {children}
    </ModalContext.Provider>
  )
}
