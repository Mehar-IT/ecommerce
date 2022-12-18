import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  loading: false,
  error: null,
};
const forgotPassword = createSlice({
  name: "forgot Pass",
  initialState,
  reducers: {
    forgotPasswordStart: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailed: (state, action) => {
      state.error = action.payload;
    },

    resetPasswordStart: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    resetPasswordFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailed,
  reset,
} = forgotPassword.actions;
export default forgotPassword.reducer;
