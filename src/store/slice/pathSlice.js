import { createSlice } from '@reduxjs/toolkit'

export const pathSlice = createSlice({
  name: 'path',
  initialState: {
    paths: []
  },
  reducers: {
    addPath: (state, data) => {
        return{ 
            ...state,
            paths:[...state.paths, data.payload]
        }
    },
    setPath: (state,data) => {   
        return{ 
            ...state,
            paths:data.payload               
        }
    },
  }
})

export const { addPath, setPath } = pathSlice.actions

export default pathSlice.reducer