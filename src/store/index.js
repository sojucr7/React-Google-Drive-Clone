import { configureStore } from '@reduxjs/toolkit'
import modalSliceReducer from './slice/modalSlice'
import addFolderSliceReducer from './slice/addFolderSlice'

let store=configureStore({
  reducer: {
    modal: modalSliceReducer,
    addFolder:addFolderSliceReducer
  }
})
export default store;