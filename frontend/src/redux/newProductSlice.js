import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  error: null,
  success: false,
};
const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    newProductStart: (state) => {
      state.loading = true;
    },
    newProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.success = action.payload.success;
    },
    newProductFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: () => initialState,
  },
});

export const { newProductStart, newProductSuccess, newProductFailed, reset } =
  newProductSlice.actions;
export default newProductSlice.reducer;
