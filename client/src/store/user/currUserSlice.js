import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    loading: false,
    error: null,
    success: false,
    userData: null,
    userId: null,

};

const currUserSlice = createSlice({
    name: "current-user",
    initialState: initialState,

    reducers: {


    }

})



export default currUserSlice.reducer;
export const { setError, logout, clearFields } = currUserSlice.actions;