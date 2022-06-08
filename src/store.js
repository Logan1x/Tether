import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userProfileReducer from "./features/userProfileSlice";
import usersReducer from "./features/userSlice";
import postsReducer from "./features/postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});
