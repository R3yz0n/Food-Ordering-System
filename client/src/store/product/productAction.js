import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from '../../APIURL';
const token = localStorage.getItem("userToken");
const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

export const createItem = createAsyncThunk('create item',
    async (values, { rejectWithValue }) => {


        console.log(values);


        console.log(token);
        try {
            console.log(values.file);
            const formData = new FormData()
            formData.append('file', values.file)
            // console.log(authHeaders);
            const fileRes = await axios.post(`${APIURL}/file`, formData, authHeaders)
            values.image = fileRes.data.url
            const { file, ...others } = values
            const res = await axios.post(`${APIURL}/item`, others, authHeaders)
            // console.log(res);

            return res.data

        }

        catch (error) {
            console.log(error);

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error);
                return rejectWithValue(error.message);
            }

        }

    }


)

export const getAllItems = createAsyncThunk('Get All Items',
    async (values, { rejectWithValue }) => {

        //toastify use garna xa fetch na huda data


        // console.log(values);


        // console.log(token);
        try {
            console.log(1);
            const res = await axios.get(`${APIURL}/item`)
            console.log(res);

            return res.data

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error);
                return rejectWithValue(error.message);
            }

        }

    }


)


export const deleteItem = createAsyncThunk('Delete An Item',
    async (values, { rejectWithValue }) => {


        // console.log(values);


        // console.log(token);
        try {
            console.log(1);
            const res = await axios.get(`${APIURL}/item/:id`)
            console.log(res);

            return res.data

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error);
                return rejectWithValue(error.message);
            }

        }

    }


)

