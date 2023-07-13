import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { getToken } from "../getToken";
const token = localStorage.getItem("userToken");
const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

export const getUser = createAsyncThunk(
  "currUser-fetch",
  async (values, { rejectWithValue }) => {
    try {
      const authHeaders = {
        headers: { Authorization: `Bearer ${values.token}` },
      };
      const res = await axios.get(
        `${APIURL}/user/${values.userId}`,
        getToken()
      );
      // console.log(res);

      return res.data;
    } catch (error) {
      // console.log(error);

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "currUser-update",
  async (values, { rejectWithValue }) => {
    try {
      //   console.log(values);
      const res = await axios.patch(
        `${APIURL}/user/${values.id}`,
        values,
        getToken()
      );
      //   console.log(res);
      toast.success("Profile updated.");
      return res.data;
    } catch (error) {
      // console.log(error);

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
