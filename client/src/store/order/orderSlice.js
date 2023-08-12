import { createSlice } from "@reduxjs/toolkit";
import { cancelOrder, completeOrder, getAllOrders, getOrderById, getUserAllOrder } from "./orderAction";

const initialState = {
    loading: false,
    error: null,
    success: false,
    userOrders: [],
    orderInfoById: {},
    allOrders: []

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
        [completeOrder.fulfilled]: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            // state.userOrders = payload
            state.orderInfoById.status = "Delivered"
            // console.log(payload);
        },
        [completeOrder.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        [completeOrder.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = false;
        },
        [getAllOrders.fulfilled]: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            // state.userOrders = payload
            state.allOrders = payload
            // console.log(payload);
        },
        [getAllOrders.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        [getAllOrders.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = false;
        },
    },
});

export default orderSlice.reducer;
export const { clearOrderData, clearFields } = orderSlice.actions;

