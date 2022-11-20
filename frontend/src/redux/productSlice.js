import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isFetching: false,
  error: "",
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailed: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

const { getProductStart, getProductSuccess, getProductFailed } =
  productSlice.actions;
export default productSlice.reducer;
