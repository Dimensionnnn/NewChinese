import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  hit: "",
  selectedIndex: "",
  userid: "",
};

export const articleSet = createSlice({
  name: "articleSet",
  initialState,
  reducers: {
    reloadArticle: (state, action) => {
      const { value, hit, selectedIndex, userid } = action.payload;
      state.value = value;
      state.hit = hit;
      state.selectedIndex = selectedIndex;
      state.userid = userid;
    },
    clearArticle: (state, action) => {
      const { value, hit, selectedIndex, userid } = action.payload;
      state.value = value;
      state.hit = hit;
      state.selectedIndex = selectedIndex;
      state.userid = userid;
    },
  },
});

export const { reloadArticle, clearArticle } = articleSet.actions;

export default articleSet.reducer;
