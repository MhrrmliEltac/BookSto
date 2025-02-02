import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import favoriteReducer from "./slice/favorite";
import cartReducer from "./slice/count";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favoriteBook: favoriteReducer,
    count: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState tipi
export type AppDispatch = typeof store.dispatch;
