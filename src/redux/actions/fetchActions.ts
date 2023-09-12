import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchData = createAsyncThunk(
  "fetch/getData",
  async (_, { rejectWithValue }) => {
    try {
      const URL = "https://64fb0783cb9c00518f7a8b10.mockapi.io/records/";
      const response = await axios.get(URL);
      if (response.statusText) {
        return response.data;
      } else {
        throw new Error();
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
      return rejectWithValue(error);
    }
  }
);

export const fetchDataById = createAsyncThunk(
  "fetch/getDataById",
  async (id: string, { rejectWithValue }) => {
    try {
      const URL = `https://64fb0783cb9c00518f7a8b10.mockapi.io/records/${id}`;
      const response = await axios.get(URL);
      if (response.statusText) {
        return response.data;
      } else {
        throw new Error();
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
      return rejectWithValue(error);
    }
  }
);
