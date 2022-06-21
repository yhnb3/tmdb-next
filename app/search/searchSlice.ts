import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  section: string;
}

const initialState: SearchState = {
  section: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSection: (state, action) => {
      state.section = action.payload.section;
    },
  },
});

export const { changeSection } = searchSlice.actions;
export default searchSlice.reducer;
