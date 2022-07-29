import { configureStore } from '@reduxjs/toolkit'
import modalSliceReducer from './slice/modalSlice'
import addFileSliceReducer from './slice/addFileSlice'
import pathSliceReducer from './slice/pathSlice'
import addFolderSliceReducer from './slice/addFolderSlice'

let store=configureStore({
  reducer: {
    modalSlice: modalSliceReducer,
    folderSlice:addFolderSliceReducer,
    fileSlice:addFileSliceReducer,
    pathSlice:pathSliceReducer
  }
})
export default store;