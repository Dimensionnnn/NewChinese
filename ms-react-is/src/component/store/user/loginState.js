import { createSlice } from "@reduxjs/toolkit";

export const loginState = createSlice({
    name: 'loginState',
    initialState: {
        value: false
    },
    reducers: {
        loggedin: (state) => {
            state.value = true;
        },
        loggedout: (state) => {
            state.value = false;
        }
    }
})

export const { loggedin, loggedout } = loginState.actions;

export default loginState.reducer;