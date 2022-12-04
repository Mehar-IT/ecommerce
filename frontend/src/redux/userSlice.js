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
    reset: () => initialState,
  },
});

export const {
  userRequestStart,
  userRequestSuccess,
  userRequestFailed,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
