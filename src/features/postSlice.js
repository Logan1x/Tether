import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: {},
  postsLoading: false,
  postLoading: false,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const res = await axios({
      method: "get",
      url: "/api/posts",
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ authToken, post }) => {
    try {
      const res = await axios({
        method: "post",
        url: "/api/posts",
        headers: {
          authorization: authToken,
        },
        data: JSON.stringify({
          postData: post,
        }),
      });

      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ authToken, postId }) => {
    try {
      const res = await axios({
        method: "post",
        url: `/api/posts/like/${postId}`,
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

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.postsLoading = false;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postsLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postLoading = true;
    },
    [likePost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postLoading = true;
    },
  },
});

export default postSlice.reducer;
