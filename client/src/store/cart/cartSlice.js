import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getAllCartItems } from "./cartAction";

const initialState = {

    loading: false,
    error: null,
    success: false,
    isCartOn: false,
    cartItems: [],
    totalQuantity: 0,



};



const cartSlice = createSlice({
    name: "items",
    initialState: initialState,

    reducers: {

        clearCartData: (state) => {
            state.cartItems = []
            state.isCartOn = false
            state.totalQuantity = 0
            state.error = null
            state.loading = false
            state.success = false
            // localStorage.removeItem("cartItemsTotal");


        },
        clearFields: (state, { payload }) => {
            state.success = false;
            state.loading = false;
            state.error = null;
        },

        showCart: (state, { payload }) => {
            state.isCartOn = !state.isCartOn

        },

        calculateTotalQuantity: (state, { payload }) => {
            if (payload && state.error === null) {
                // console.log(state.error);
                state.totalQuantity = state.totalQuantity + 1
                // console.log(state.totalQuantity);
            }

            else if (state.cartItems.length > 0) {
                // console.log('here');
                state.totalQuantity = state.cartItems.reduce((total, item) => {
                    return total + item.quantity
                }, 0)



            }

        }







    },

    extraReducers: {

        [addToCart.fulfilled]: (state, { payload }) => {
            state.success = payload.item;
            state.error = null;
            state.loading = false





        },
        [addToCart.pending]: (state) => {

            state.loading = true;
            state.error = null;
            state.success = false


        },
        [addToCart.rejected]: (state, { payload }) => {
            state.error = payload
            state.loading = false
            state.success = false;


        },

        [getAllCartItems.fulfilled]: (state, { payload }) => {
            // console.log(payload);
            state.success = true
            state.cartItems = payload
            state.error = null;
            state.loading = false





        },
        [getAllCartItems.pending]: (state) => {

            state.loading = true;
            state.error = null;
            state.success = false


        },
        [getAllCartItems.rejected]: (state, { payload }) => {
            state.error = payload
            state.loading = false
            state.success = false;


        },

    }
})









export default cartSlice.reducer;
export const { clearFields, showCart, calculateTotalQuantity, clearCartData } = cartSlice.actions;