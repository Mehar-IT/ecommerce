import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  loading: false,
  error: null,
};
const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {
    orderDetailRequest: (state) => {
      state.loading = true;
    },
    orderDetailSucess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    orderDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  orderDetailRequest,
  orderDetailSucess,
  orderDetailFail,
  clearError,
} = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
