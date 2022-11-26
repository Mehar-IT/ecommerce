import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  productCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0,
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
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    getProductFailed: (state, action) => {
      state.error = action.payload;
    },
    reset: () => initialState,
  },
});

export const { getProductStart, getProductSuccess, getProductFailed, reset } =
  productSlice.actions;
export default productSlice.reducer;
