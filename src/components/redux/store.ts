import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState tipi
export type AppDispatch = typeof store.dispatch;
