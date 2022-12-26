import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const userDetailSlice = createSlice({
  name: "User Detail",
  initialState,
  reducers: {
    userDetailStart: (state) => {
      state.loading = true;
    },
    userDetailSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const { userDetailStart, userDetailSuccess, userDetailFailed, reset } =
  userDetailSlice.actions;
export default userDetailSlice.reducer;
