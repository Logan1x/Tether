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

export const postFollowUser = createAsyncThunk(
  "users/followUser",
  async ({ authToken, username }) => {
    try {
      const res = await axios({
        method: "POST",
        url: `/api/users/follow/${username}`,
        headers: {
          authorization: authToken,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const postUnfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async ({ authToken, username }) => {
    try {
      const res = await axios({
        method: "POST",
        url: `/api/users/unfollow/${username}`,
        headers: {
          authorization: authToken,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

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
    [postFollowUser.pending]: (state) => {
      state.userLoading = false;
    },
    [postFollowUser.fulfilled]: (state, action) => {
      state.userLoading = true;
      const { followuser, user } = action.payload;
      state.users = state.users.map((stateUser) => {
        if (stateUser.username === followuser.username) {
          return {
            ...stateUser,
            followers: [...stateUser.followers, { ...followuser }],
          };
        }
        return stateUser;
      });
      state.users = state.users.map((stateUser) => {
        if (stateUser.username === user.username) {
          return {
            ...stateUser,
            following: [...stateUser.following, { ...user }],
          };
        }
        return stateUser;
      });
    },
    [postUnfollowUser.pending]: (state) => {
      state.userLoading = false;
    },
    [postUnfollowUser.fulfilled]: (state, action) => {
      state.userLoading = true;
      const { unfollowuser, user } = action.payload;
      state.users = state.users.map((stateUser) => {
        if (stateUser.username === unfollowuser.username) {
          return {
            ...stateUser,
            followers: stateUser.followers.filter(
              (follower) => follower.username !== unfollowuser.username
            ),
          };
        }
        return stateUser;
      });
      state.users = state.users.map((stateUser) => {
        if (stateUser.username === user.username) {
          return {
            ...stateUser,
            following: stateUser.following.filter(
              (following) => following.username !== user.username
            ),
          };
        }
        return stateUser;
      });
    },
  },
});

export default userSlice.reducer;
