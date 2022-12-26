import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdated: false,
  loading: false,
  error: null,
};

const orderListSlice = createSlice({
  name: "updateOrder",
  initialState,
  reducers: {
    updateOrderStart: (state) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateOrderFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const {
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailed,
  reset,
} = orderListSlice.actions;
export default orderListSlice.reducer;
