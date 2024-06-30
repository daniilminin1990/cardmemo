import { ModalKey } from '@/common/hooks/useModal'

export interface Modal {
  isOpen: boolean
  modalKey: ModalKey | null
}
