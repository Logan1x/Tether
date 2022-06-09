import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileLoading: false,
  userPostsLoading: false,
  userProfileData: {},
  userPosts: {},
};

export const getUserProfile = createAsyncThunk(
  "userProfile/getUserProfile",
  async ({ authToken, username }) => {
    try {
      const res = await axios({
        method: "GET",
        url: `/api/users/${username}`,
        headers: {
          authorization: authToken,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    profileUpdate: (state, action) => {
      state.userProfileData.username = action.payload.username;
      state.userProfileData.firstName = action.payload.firstName;
      state.userProfileData.lastName = action.payload.lastName;
      state.userProfileData.bio = action.payload.bio;
    },
  },
  extraReducers: {
    [getUserProfile.pending]: (state) => {
      state.userProfileLoading = false;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfileLoading = true;
      state.userProfileData = action.payload.user;
    },
  },
});

export const { profileUpdate } = userProfileSlice.actions;

export default userProfileSlice.reducer;
