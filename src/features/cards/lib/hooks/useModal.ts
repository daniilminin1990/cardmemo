import { useContext } from "react";
import { ModalContext } from "@/features/cards/ui/Cards/components/ModalProvider/ModalProvider";

export enum ModalKey {
  CreateDeck = 'CreateDeck',
  DeleteDeck = 'DeleteDeck',
  DeleteCard = 'DeleteCard'
}

export const useModal = (modalKey: ModalKey) => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const {toggleModal, isOpen } = context;

  const setOpen = () => toggleModal(modalKey);

  return {
    setOpen,
    isOpen: isOpen && modalKey === context.modalKey,
  };
};