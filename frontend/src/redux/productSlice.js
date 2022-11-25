import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  productCount: 0,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
    },
    getProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    reset: (state) => {
      state.error = null;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductFailed, reset } =
  productSlice.actions;
export default productSlice.reducer;
