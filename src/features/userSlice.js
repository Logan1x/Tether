import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userLoading: false,
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/users/",
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.userLoading = false;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.userLoading = true;
      state.users = action.payload.users;
    },
  },
});

export default userSlice.reducer;
