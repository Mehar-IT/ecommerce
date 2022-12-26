import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleted: false,
  loading: false,
  error: null,
};

const orderListSlice = createSlice({
  name: "deleteOrder",
  initialState,
  reducers: {
    deleteOrderStart: (state) => {
      state.loading = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteOrderFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const {
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailed,
  reset,
} = orderListSlice.actions;
export default orderListSlice.reducer;
