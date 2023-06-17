import { createSlice } from "@reduxjs/toolkit";
import { createCart } from "./cartAction";
import { useDispatch } from "react-redux";

const initialState = {

    loading: false,
    error: null,
    success: false,
    isCartOn: false,
    cartItems: [],
    totalPrice: 0,



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

        addToCart: (state, { payload }) => {
            const newItem = payload.itemId;
            console.log(newItem);
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (!existingItem) {

                //create brand new cart
            }

            else {

                // update the quantity
            }



        }




    },
})









export default cartSlice.reducer;
export const { clearFields, showCart, addToCart } = cartSlice.actions;