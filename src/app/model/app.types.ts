import { ModalKey } from '@/common/hooks/useModal'

export interface AppSettings {
  blur: boolean
  modal: Modal
  theme: Theme
}
export type Theme = 'moon' | 'sun'

export interface Modal {
  isOpen: boolean
  modalKey: ModalKey | null
}
