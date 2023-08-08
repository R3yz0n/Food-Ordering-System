import { createSlice } from "@reduxjs/toolkit";
import { getUserAllOrder } from "./orderAction";

const initialState = {
    loading: false,
    error: null,
    success: false,
    userOrders: []

};

const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,

    reducers: {
        clearFields: (state, { payload }) => {
            // console.log("clearing fields");
            state.success = false;
            state.loading = false;
            state.error = null;
        },

        clearOrderData: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: {
        [getUserAllOrder.fulfilled]: (state, { payload }) => {
            state.success = payload;
            state.error = null;
            state.loading = false;
            state.userOrders = payload
            // console.log(payload);
        },
        [getUserAllOrder.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        [getUserAllOrder.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = false;
        },

    },
});

export default orderSlice.reducer;
export const { clearUserData, clearFields } = orderSlice.actions;

