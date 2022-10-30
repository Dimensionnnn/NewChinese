import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchWord: "",
};

export const docpageSet = createSlice({
  name: "docpageSet",
  initialState,
  reducers: {
    memorizeSelect: (state, action) => {
      const { searchWord } = action.payload;
      state.searchWord = searchWord;
    },
    clearSelect: (state, action) => {
      const { searchWord } = action.payload;
      state.searchWord = searchWord;
    },
  },
});

export const { memorizeSelect, clearSelect } = docpageSet.actions;

export default docpageSet.reducer;
