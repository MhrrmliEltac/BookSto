import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  user: string | object | [];
  isLog: boolean;
}

const initialState: AuthState = {
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "[]");
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return [];
    }
  })(),
  isLog: JSON.parse(localStorage.getItem("isLog") || "false"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string | object>) => {
      try {
        const userData = JSON.stringify(action.payload);
        localStorage.setItem("user", userData);
        state.user = action.payload;
      } catch (e) {
        console.error("Failed to save user to localStorage", e);
      }
    },
    clearUser: (state) => {
      try {
        localStorage.removeItem("user");
        state.user = [];
      } catch (e) {
        console.error("Failed to clear user from localStorage", e);
      }
    },

    isLog: (state, action: PayloadAction<boolean>) => {
      try {
        const isLogData = JSON.stringify(action.payload);
        localStorage.setItem("isLog", isLogData);
        state.isLog = action.payload;
      } catch (e) {
        console.error("Failed to save isLog to localStorage", e);
      }
    },
  },
});

export const { login, isLog } = authSlice.actions;

export const selectUser = (state: RootState) => (state.auth as AuthState).user;

export default authSlice.reducer;
