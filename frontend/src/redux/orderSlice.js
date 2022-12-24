import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  loading: false,
  error: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSucess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSucess,
  createOrderFail,
  clearError,
} = orderSlice.actions;
export default orderSlice.reducer;
