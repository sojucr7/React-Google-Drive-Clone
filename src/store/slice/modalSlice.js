import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showModal: false,
    modalId: null
  },
  reducers: {
    open: (state, data) => {
      state.showModal = true
      state.modalId = data.payload;
    },
    close: state => {
      state.showModal = false
      state.modalId = null;
    }
  }
})

export const { open, close } = modalSlice.actions

export default modalSlice.reducer