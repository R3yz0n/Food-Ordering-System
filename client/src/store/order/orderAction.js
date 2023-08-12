import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { getToken } from "../getToken";


export const createAnOrder = createAsyncThunk(
    "Create An Order",
    async (values, { rejectWithValue }) => {

        try {
            const res = await axios.post(`${APIURL}/order`, values, getToken());
            // console.log(res);
            toast.success(res.data.message)
            return res.data.message;

        } catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);

export const getUserAllOrder = createAsyncThunk(
    "Fetch all order of a user",
    async (values, { rejectWithValue }) => {

        try {
            const res = await axios.get(`${APIURL}/order/user-orders/${values.userId}`, getToken());
            // toast.success(res.data.message)
            return res.data;

        } catch (error) {
            console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);


export const getOrderById = createAsyncThunk(
    "Fetch an order by id",
    async (values, { rejectWithValue }) => {

        try {
            const res = await axios.get(`${APIURL}/order/${values}`, getToken());
            // toast.success(res.data.message)
            return res.data;

        } catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);


export const cancelOrder = createAsyncThunk(
    "Cancel an order",
    async (values, { rejectWithValue }) => {

        try {
            const res = await axios.patch(`${APIURL}/order/cancel/${values}`, values, getToken());
            toast.success(res.data.message)
            return res.data;

        } catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);

export const completeOrder = createAsyncThunk(
    "Deliver an order",
    async (values, { rejectWithValue }) => {

        try {
            const res = await axios.patch(`${APIURL}/order/complete/${values}`, values, getToken());
            toast.success(res.data.message)
            return res.data;

        } catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);


export const getAllOrders = createAsyncThunk(
    "Fetch All Orders",
    async (values, { rejectWithValue }) => {

        try {
            const res = await axios.get(`${APIURL}/order`, getToken());
            // toast.success(res.data.message)
            return res.data;

        } catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);



