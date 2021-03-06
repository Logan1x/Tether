import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  bookmarks: [],
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

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ authToken, post }) => {
    try {
      const res = await axios({
        method: "post",
        url: `/api/posts/edit/${post._id}`,
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

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ authToken, postId }) => {
    try {
      const res = await axios({
        method: "delete",
        url: `/api/posts/${postId}`,
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

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async ({ authToken, postId }) => {
    try {
      const res = await axios({
        method: "post",
        url: `/api/posts/dislike/${postId}`,
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

export const getBookmarks = createAsyncThunk(
  "posts/getBookmarks",
  async ({ authToken }) => {
    try {
      const res = await axios({
        method: "get",
        url: "/api/users/bookmark",
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

export const bookmarkPost = createAsyncThunk(
  "posts/bookmarkPost",
  async ({ authToken, postId }) => {
    try {
      const res = await axios({
        method: "post",
        url: `/api/users/bookmark/${postId}`,
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

export const removeBookmarkPost = createAsyncThunk(
  "posts/removeBookmarkPost",
  async ({ authToken, postId }) => {
    try {
      const res = await axios({
        method: "post",
        url: `/api/users/remove-bookmark/${postId}`,
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
    [editPost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postLoading = true;
    },
    [likePost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postLoading = true;
    },
    [dislikePost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postLoading = true;
    },
    [getBookmarks.fulfilled]: (state, action) => {
      state.bookmarks = action.payload.bookmarks;
      state.bookmarksLoading = true;
    },
    [bookmarkPost.fulfilled]: (state, action) => {
      state.bookmarks = action.payload.bookmarks;
      state.bookmarksLoading = true;
    },
    [removeBookmarkPost.fulfilled]: (state, action) => {
      state.bookmarks = action.payload.bookmarks;
      state.bookmarksLoading = true;
    },
  },
});

export default postSlice.reducer;
