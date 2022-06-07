import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userProfileReducer from "./features/userProfileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
  },
});
