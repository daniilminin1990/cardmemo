import { RootState } from '@/app/store/store'

export const selectIsOpen = (state: RootState) => state.modal.isOpen
export const selectModalKey = (state: RootState) => state.modal.modalKey
