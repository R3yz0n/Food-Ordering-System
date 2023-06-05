import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import { userLogin, userRegister } from "./authAction";


// backend api /user/id token frontend ma decode garera id pathani ni get user
//aashish ko jastai  page not found rakhnaxa
//skeleton
//lazy loading in map

//sujan ko ma forgot password 

// dashboard ra invetory ra accounts customers (cutomers details)

// inventory vitra 

//purchase order sales order category


// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const userData = userToken ? jwt(userToken) : null;

const initialState = {

    loading: false,
    error: null,
    success: false,
    userToken,
    userData,
    userId: null
};

const authSlice = createSlice({
    name: "user-auth",
    initialState: initialState,

    reducers: {

        logout: (state, { payload }) => {
            localStorage.removeItem("userToken");
            state.loading = false;
            state.userToken = null;
            state.error = null;
            state.userData = null
            state.userId = null

        },
        clearFields: (state, { payload }) => {
            state.success = false;
            state.loading = false;
            state.error = null;
        },


    },




    extraReducers: {
        //token ni pathauni user fetch garda since it's a protected with middleware

        //user Login
        [userLogin.fulfilled]: (state, { payload }) => {
            // console.log(state);
            state.success = payload.message;
            state.error = null;
            state.userToken = payload.token
            state.loading = false
            localStorage.setItem("userToken", payload.token);
            const userData = jwt(payload.token);
            state.userData = userData;
            state.userId = payload.id
            console.log(payload);





        },
        [userLogin.pending]: (state) => {

            state.loading = true;
            state.error = null;
            state.success = false


        },
        [userLogin.rejected]: (state, { payload }) => {
            console.log(payload);
            state.error = payload
            state.loading = false
            // console.log(state);
            state.success = false;


        },

        //user Signup
        [userRegister.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false
        },
        [userRegister.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null
            state.success = payload.message;


        },
        [userRegister.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false
        },

    }

})

// export const {}
export default authSlice.reducer;
export const { setError, logout, clearFields } = authSlice.actions;