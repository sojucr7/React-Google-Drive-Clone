import { configureStore } from '@reduxjs/toolkit'
import modalSliceReducer from './slice/modalSlice'
import addFolderSliceReducer from './slice/addFolderSlice'

let store=configureStore({
  reducer: {
    modal: modalSliceReducer,
    folders:addFolderSliceReducer
  }
})
export default store;