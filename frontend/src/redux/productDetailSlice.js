import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  error: "",
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
      state.error = "";
    },
    getProductDetailFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductDetailStart,
  getProductDetailSuccess,
  getProductDetailFailed,
} = productDetailSlice.actions;
export default productDetailSlice.reducer;
