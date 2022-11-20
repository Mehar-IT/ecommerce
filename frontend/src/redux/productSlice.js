import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  productCount: 0,
  error: "",
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
      state.error = "";
    },
    getProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductFailed } =
  productSlice.actions;
export default productSlice.reducer;
