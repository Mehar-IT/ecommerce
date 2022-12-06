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
    loginRequestStart: (state) => {
      state.loading = true;
    },
    loginRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginRequestFailed: (state, action) => {
      state.error = action.payload;
    },

    registerRequestStart: (state) => {
      state.loading = true;
    },
    registerRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    registerRequestFailed: (state, action) => {
      state.error = action.payload;
    },

    loadRequestStart: (state) => {
      state.loading = true;
    },
    loadRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loadRequestFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    logoutSuccess: () => initialState,

    logoutFailed: (state, action) => {
      state.error = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  loginRequestStart,
  loginRequestSuccess,
  loginRequestFailed,
  registerRequestStart,
  registerRequestSuccess,
  registerRequestFailed,
  loadRequestStart,
  loadRequestSuccess,
  loadRequestFailed,
  logoutSuccess,
  logoutFailed,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
