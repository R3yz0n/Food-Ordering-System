import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from '../../utils/constants';
import { toast } from "react-hot-toast";
import { getToken } from "../getToken";


export const addToCart = createAsyncThunk('create cart',
    async (values, { rejectWithValue }) => {
        console.log('create cart');

        try {

            console.log(values);
            const res = await axios.post(`${APIURL}/cart`, values, getToken())
            console.log(res);
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
