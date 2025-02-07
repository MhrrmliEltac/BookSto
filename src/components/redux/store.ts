import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import favoriteReducer from "./slice/favorite";
import cartReducer from "./slice/count";
import navigateReducer from "./slice/navigate";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favoriteBook: favoriteReducer,
    count: cartReducer,
    navigate: navigateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState tipi
export type AppDispatch = typeof store.dispatch;
