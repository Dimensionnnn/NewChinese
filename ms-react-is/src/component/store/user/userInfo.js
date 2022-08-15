import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    userToken: ''
}

export const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {

    }
})