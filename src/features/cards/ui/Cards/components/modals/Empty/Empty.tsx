import ModalOnEmpty from '@/components/Modals/ModalOnEmpty/ModalOnEmpty'
import { ModalKey, useModal } from '@/hooks/useModal'

export const Empty = () => {
  const { isOpen, setOpen } = useModal(ModalKey.Empty)

  return <ModalOnEmpty open={isOpen} setIsOpenModal={setOpen} />
}
