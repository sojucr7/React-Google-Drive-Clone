import { createSlice } from '@reduxjs/toolkit'

export const addFolderSlice = createSlice({
  name: 'addFolder',
  initialState: {
    folders: []
  },
  reducers: {
    addFolder: (state,data) => {    
        return{ 
            ...state,
            folders:[...state.folders, data.payload]
        }
    },
    setFolders: (state,data) => {   
        return{ 
            ...state,
            folders:data.payload               
        }
    },
  }
})

export const { addFolder,setFolders } = addFolderSlice.actions

export default addFolderSlice.reducer