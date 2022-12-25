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
      state.loading = false;
    },

    getAdminProductStart: (state) => {
      state.loading = true;
    },
    getAdminProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getAdminProductFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: () => initialState,
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailed,
  getAdminProductStart,
  getAdminProductSuccess,
  getAdminProductFailed,
  reset,
} = productSlice.actions;
export default productSlice.reducer;
