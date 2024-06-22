import { ModalKey } from '@/hooks/useModal'

export interface Modal {
  isOpen: boolean
  modalKey: ModalKey | null
}
