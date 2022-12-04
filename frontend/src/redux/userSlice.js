import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequestStart: (state) => {
      state.loading = true;
    },
    userRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    userRequestFailed: (state, action) => {
      state.error = action.payload;
    },

    registerUserRequestStart: (state) => {
      state.loading = true;
    },
    registerUserRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    registerUserRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  userRequestStart,
  userRequestSuccess,
  userRequestFailed,
  registerUserRequestStart,
  registerUserRequestSuccess,
  registerUserRequestFailed,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
