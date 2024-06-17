import { createContext, ReactNode, useState } from "react";
import { ModalKey } from "@/features/cards/lib/hooks/useModal";

// Создаем интерфейс для контекста модального окна
interface ModalContextProps {
  modalKey?: ModalKey;
  isOpen: boolean;
  toggleModal: (key: ModalKey) => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }:{children: ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState<ModalKey | undefined>();

  const toggleModal = (key: ModalKey) => {
    if(isOpen) {
      setModalKey(undefined)
    }
    setModalKey(key);
    setIsOpen(!isOpen);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalKey, toggleModal, }}>
      {children}
    </ModalContext.Provider>
  );
};
