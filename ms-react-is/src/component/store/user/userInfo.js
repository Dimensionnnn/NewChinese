import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  userid: "",
};

export const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const { user, token, userid } = action.payload;
      state.user = user;
      state.token = token;
      state.userid = userid;
    },
    userLoggedout: (state, action) => {
      const { user, token, userid } = action.payload;
      state.user = user;
      state.token = token;
      state.userid = userid;
    },
  },
});

export const { userLoggedIn, userLoggedout } = userInfo.actions;

export default userInfo.reducer;
