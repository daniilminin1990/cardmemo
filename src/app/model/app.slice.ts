import { AppSettings, Theme } from '@/app/model/app.types'
import { ModalKey } from '@/common/hooks/useModal'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: AppSettings = {
  blur: true,
  modal: {
    isOpen: false,
    modalKey: null,
  },
  theme: (localStorage.getItem('theme') as Theme) || 'moon',
}

export const appSlice = createSlice({
  initialState: initialState,
  name: 'app',
  reducers: {
    setBlur: (state, action: PayloadAction<{ blur: boolean }>) => {
      state.blur = action.payload.blur
    },
    setTheme: (state, action: PayloadAction<{ theme: Theme }>) => {
      state.theme = action.payload.theme
    },
    toggleModal: (state, action: PayloadAction<{ key: ModalKey; open: boolean }>) => {
      state.modal.isOpen = action.payload.open
      state.modal.modalKey = action.payload.open ? action.payload.key : null
    },
  },
})

export const { setBlur, setTheme, toggleModal } = appSlice.actions

export default appSlice.reducer
