import { RootState } from '@/app/store/store'

export const selectTheme = (state: RootState) => state.app.theme
export const selectBlur = (state: RootState) => state.app.blur
export const selectApp = (state: RootState) => state.app
export const selectIsOpen = (state: RootState) => state.app.modal.isOpen
export const selectModalKey = (state: RootState) => state.app.modal.modalKey
