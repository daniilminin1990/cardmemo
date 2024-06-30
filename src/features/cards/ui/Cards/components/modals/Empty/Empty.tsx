import { ModalKey, useModal } from '@/common/hooks/useModal'
import ModalOnEmpty from '@/components/Modals/ModalOnEmpty/ModalOnEmpty'

export const Empty = () => {
  const { isOpen, setOpen } = useModal(ModalKey.Empty)

  return <ModalOnEmpty open={isOpen} setIsOpenModal={setOpen} />
}
