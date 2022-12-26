import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    orderListStart: (state) => {
      state.loading = true;
    },
    orderListSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    orderListFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const { orderListStart, orderListSuccess, orderListFailed, reset } =
  orderListSlice.actions;
export default orderListSlice.reducer;
