import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};
const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    myOrdersRequest: (state) => {
      state.loading = true;
    },
    myOrdersSucess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    myOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { myOrdersRequest, myOrdersSucess, myOrdersFail, clearError } =
  myOrdersSlice.actions;
export default myOrdersSlice.reducer;
