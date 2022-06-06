import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: localStorage.getItem("tether-token") === null ? false : true,
  authToken: localStorage.getItem("tether-token") ?? null,
  user: JSON.parse(localStorage.getItem("tether-user")) ?? null,
};

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async ({ username, password, email, fname }) => {
    try {
      const res = await axios.post("/api/auth/signup", {
        username,
        password,
        email,
        fname,
      });
      localStorage.setItem("tether-token", res.data.encodedToken);
      localStorage.setItem("tether-user", JSON.stringify(res.data.createdUser));
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ username, password }) => {
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("tether-token", res.data.encodedToken);
      localStorage.setItem("tether-user", JSON.stringify(res.data.foundUser));
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("lattice-token");
      localStorage.removeItem("lattice-user");
      state.isAuth = false;
      state.user = null;
      state.authToken = null;
    },
  },
  extraReducers: {
    [userSignUp.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.authToken = action.payload.encodedToken;
      state.user = action.payload.createdUser;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.authToken = action.payload.encodedToken;
      state.user = action.payload.foundUser;
    },
  },
});
export const { userLogout } = authSlice.actions;
export default authSlice.reducer;
