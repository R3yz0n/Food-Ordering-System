import { createSlice } from "@reduxjs/toolkit";
import { cancelOrder, getOrderById, getUserAllOrder } from "./orderAction";

const initialState = {
    loading: false,
    error: null,
    success: false,
    userOrders: [],
    orderInfoById: {}

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
            state.error = null;
            state.userOrders = []
            state.orderInfoById = {}
        },



    },
    extraReducers: {
        [getUserAllOrder.fulfilled]: (state, { payload }) => {
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

        [getOrderById.fulfilled]: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            // state.userOrders = payload
            state.orderInfoById = payload
            // console.log(payload);
        },
        [getOrderById.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        [getOrderById.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = false;
        },

        [cancelOrder.fulfilled]: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            // state.userOrders = payload
            state.orderInfoById.status = "Cancelled"
            // console.log(payload);
        },
        [cancelOrder.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        [cancelOrder.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = false;
        },
    },
});

export default orderSlice.reducer;
export const { clearOrderData, clearFields } = orderSlice.actions;

