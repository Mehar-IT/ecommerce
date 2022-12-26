import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleted: false,
  loading: false,
  error: null,
};

const productReviewsSlice = createSlice({
  name: "Delete Reviews",
  initialState,
  reducers: {
    deleteReviewStart: (state) => {
      state.loading = true;
    },
    deleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteReviewFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const {
  deleteReviewStart,
  deleteReviewSuccess,
  deleteReviewFailed,
  reset,
} = productReviewsSlice.actions;
export default productReviewsSlice.reducer;
