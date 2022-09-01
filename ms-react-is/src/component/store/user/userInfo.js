import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    token: ''
}

export const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        },
        userLoggedout: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        }
    }
})

export const { userLoggedIn, userLoggedout } = userInfo.actions;

export default userInfo.reducer;