import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from '../../utils/constants';
const token = localStorage.getItem("userToken");
const authHeaders = { headers: { Authorization: `Bearer ${token}` } }


export const getUser = createAsyncThunk('currUser-fetch',
    async (values, { rejectWithValue }) => {
        console.log(values);



        try {

            const res = await axios.get(`${APIURL}/user/${1}`, authHeaders)

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