import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import { userLogin } from "./userAction";

const initialState = {
    loading: false,
    error: null,
    success: false,
    userToken: null,
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,

    reducers: {
        setError: (state) => {
            state.error = null

        },

    },




    extraReducers: {
        [userLogin.fulfilled]: (state, { payload }) => {
            console.log(state);
            state.success = payload.message;
            state.error = null;
            state.userToken = payload.token
            state.loading = false




        },
        [userLogin.pending]: (state) => {


        },
        [userLogin.rejected]: (state, { payload }) => {
            console.log(payload);
            state.error = payload
            state.loading = false
            console.log(state);
            state.success = false;


        }

    }

})

// export const {}
export default userSlice.reducer;
export const { setError } = userSlice.actions;