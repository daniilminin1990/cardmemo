import { ModalKey } from '@/hooks/useModal'
import { Modal } from '@/services/modal/modal.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Modal = {
  isOpen: false,
  modalKey: null,
}

export const modalSlice = createSlice({
  initialState: initialState,
  name: 'modal',
  reducers: {
    toggleModal: (state, action: PayloadAction<{ key: ModalKey; open: boolean }>) => {
      state.isOpen = action.payload.open
      state.modalKey = action.payload.open ? action.payload.key : null
    },
  },
})

export const { toggleModal } = modalSlice.actions

export default modalSlice.reducer
