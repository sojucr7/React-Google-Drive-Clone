import { createSlice } from '@reduxjs/toolkit'

export const addFileSlice = createSlice({
  name: 'files',
  initialState: {
    files: []
  },
  reducers: {
    addFile: (state,data) => {    
        return{ 
            ...state,
            files:[...state.files, data.payload]
        }
    },
    setFiles: (state,data) => {   
        return{ 
            ...state,
            files:data.payload               
        }
    },
  }
})

export const { addFile,setFiles } = addFileSlice.actions

export default addFileSlice.reducer