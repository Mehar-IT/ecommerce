import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdated: false,
  loading: false,
  error: null,
};

const updateUserSlice = createSlice({
  name: "Update User",
  initialState,
  reducers: {
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateUserFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const { updateUserStart, updateUserSuccess, updateUserFailed, reset } =
  updateUserSlice.actions;
export default updateUserSlice.reducer;
