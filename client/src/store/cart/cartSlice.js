import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    loading: false,
    error: null,
    success: false,
    cartItems: [],
    isCartOn: false

};



const cartSlice = createSlice({
    name: "items",
    initialState: initialState,

    reducers: {


        clearFields: (state, { payload }) => {
            state.success = false;
            state.loading = false;
            state.error = null;
        },

        showCart: (state, { payload }) => {
            state.isCartOn = !state.isCartOn

        },




    },
})









export default cartSlice.reducer;
export const { clearFields, showCart } = cartSlice.actions;