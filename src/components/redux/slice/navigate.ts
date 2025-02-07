import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NavigateState {
  navigate: string;
}

const initialState: NavigateState = {
  navigate: "",
};

export const navigateSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    navigatePath: (state, action: PayloadAction<string>) => {
      state.navigate = action.payload;
    },
  },
});

export const { navigatePath } = navigateSlice.actions;

export const selectAll = (state: RootState) =>
  (state.navigate as NavigateState).navigate;

export default navigateSlice.reducer;
