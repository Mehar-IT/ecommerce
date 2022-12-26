import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const productReviewsSlice = createSlice({
  name: "All Reviews",
  initialState,
  reducers: {
    allReviewStart: (state) => {
      state.loading = true;
    },
    allReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    allReviewFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const { allReviewStart, allReviewSuccess, allReviewFailed, reset } =
  productReviewsSlice.actions;
export default productReviewsSlice.reducer;
