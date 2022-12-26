import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  isUpdated: false,
};
const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    updateProductStart: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateProductFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: () => initialState,
  },
});

export const {
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  reset,
} = updateProductSlice.actions;
export default updateProductSlice.reducer;
