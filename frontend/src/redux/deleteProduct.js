import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  isDeleted: false,
};
const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    deleteProductStart: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteProductFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: () => initialState,
  },
});

export const {
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailed,
  reset,
} = deleteProductSlice.actions;
export default deleteProductSlice.reducer;
