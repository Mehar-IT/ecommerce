import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  error: null,
};
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    getProductDetailStart: (state) => {
      state.loading = true;
    },
    getProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    },
    getProductDetailFailed: (state, action) => {
      state.error = action.payload;
    },
    reset: (state) => {
      state.error = null;
    },
  },
});

export const {
  getProductDetailStart,
  getProductDetailSuccess,
  getProductDetailFailed,
  reset,
} = productDetailSlice.actions;
export default productDetailSlice.reducer;
