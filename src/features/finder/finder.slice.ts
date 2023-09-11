import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux";
import { addByContext, getByContext } from "./finder.thunk";
import { book, books } from "../../types/booksapi.ts";

export interface FinderState {
  isLoading: boolean;
  books: books | null;
  selectedBook: book | null;
}

const initialState: FinderState = {
  books: null,
  selectedBook: null,
  isLoading: false,
};

export const finderSlice = createSlice({
  name: "finder",
  initialState,
  reducers: {
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getByContext.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
      })
      .addCase(getByContext.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getByContext.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addByContext.fulfilled, (state, action) => {
        if (state.books && action.payload.items)
          state.books.items.push(...action.payload.items);
        state.isLoading = false;
      })
      .addCase(addByContext.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addByContext.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectFinder = (state: RootState) => state.finder;

export const { selectBook } = finderSlice.actions;

export default finderSlice.reducer;
