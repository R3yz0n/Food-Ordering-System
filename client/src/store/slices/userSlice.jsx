import { createSlice } from '@reduxjs/toolkit';
// import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token') || null,

    },
    reducers: {
        addToken: (state, action) => {

            state.token = action.payload
            console.log(state.token);
            localStorage.setItem('token', state.token)



        },
        getUser: (state, action) => {

            const decodedToken = jwtDecode(action.payload)

        },

        removeUser: (state, action) => {

            return action.payload;
        },
    },
});


//action is the function
export const { addToken, removeUser } = userSlice.actions;
export default userSlice.reducer;

