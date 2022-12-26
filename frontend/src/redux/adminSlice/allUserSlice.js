import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const allUserSlice = createSlice({
  name: "All User",
  initialState,
  reducers: {
    allUserStart: (state) => {
      state.loading = true;
    },
    allUserSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUserFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const { allUserStart, allUserSuccess, allUserFailed, reset } =
  allUserSlice.actions;
export default allUserSlice.reducer;
