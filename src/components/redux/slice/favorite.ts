import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FavoriteState {
  favoriteBooks: object[];
}

const initialState: FavoriteState = {
  favoriteBooks: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<object>) => {
      state.favoriteBooks = [...state.favoriteBooks, action.payload];
    },
  },
});

export const { addFavorite } = favoriteSlice.actions;

export const selectUser = (state: RootState) =>
  (state.favoriteBook as FavoriteState).favoriteBooks;

export default favoriteSlice.reducer;
