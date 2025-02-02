import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCartBook } from "../../../../utils/firebase";
import { RootState } from "../store";

interface CartState {
  count: number;
}

const initialState: CartState = {
  count: 0,
};

export const fetchCartLength = createAsyncThunk<number, string>(
  "cart/fetchCartLength",
  async (userId: string) => {
    const books = await getCartBook(userId);
    return books.length || 0;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCartLength.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.count = action.payload;
      }
    );
  },
});

export const { setCartCount } = cartSlice.actions;
export const selectAll = (state: RootState) => (state.count as CartState).count;

export default cartSlice.reducer;
