import { createSlice } from '@reduxjs/toolkit'

interface SearchState {
  currentSection: string
}

const initialState: SearchState = {
  currentSection: "",
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSection: (state, action) => {
      state.currentSection = action.payload.section 
    },
  },
})

export const { changeSection } = searchSlice.actions
export default searchSlice.reducer