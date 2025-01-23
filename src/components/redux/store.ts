import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import favoriteReducer from "./slice/favorite";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favoriteBook: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState tipi
export type AppDispatch = typeof store.dispatch;
