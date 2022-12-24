import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  loading: false,
  error: null,
};
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    reviewRequest: (state) => {
      state.loading = true;
    },
    reviewSucess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    reviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetReview: () => initialState,
  },
});

export const { reviewRequest, reviewSucess, reviewFail, resetReview } =
  reviewSlice.actions;
export default reviewSlice.reducer;
