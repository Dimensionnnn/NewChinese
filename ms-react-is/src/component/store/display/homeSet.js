import { createSlice } from "@reduxjs/toolkit";

export const homeSet = createSlice({
  name: "homeSet",
  initialState: {
    value: 0,
  },
  reducers: {
    word: (state) => {
      state.value = 1;
    },
    article: (state) => {
      state.value = 2;
    },
    edit: (state) => {
      state.value = 3;
    },
    login: (state) => {
      state.value = 4;
    },
    reset: (state) => {
      state.value = 0;
    }
  },
});

export const { word, article, edit, login, reset } = homeSet.actions;

export default homeSet.reducer;
