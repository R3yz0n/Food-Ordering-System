import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from '../../utils/constants';
import { toast } from "react-hot-toast";
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

            return res.data.message

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
        console.log('fetching data............');


        // console.log(values);


        // console.log(token);
        try {
            // console.log(1);
            const res = await axios.get(`${APIURL}/item`)
            // console.log(res);

            return res.data

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                toast.error(error.message)
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
            // console.log(1);


            const fileRes = await axios.delete(`${APIURL}/file/${values.image}`, authHeaders)
            // console.log(fileRes);

            const res = await axios.delete(`${APIURL}/item/${values.id}`, authHeaders)
            toast.success(res.data.message)

            return res.data

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }

        }

    }


)

