import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showModal: false
  },
  reducers: {
    open: state => {
      state.showModal = true
    },
    close: state => {
      state.showModal = false
    }
  }
})

export const { open, close } = modalSlice.actions

export default modalSlice.reducer