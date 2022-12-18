import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdated: false,
  loading: false,
  error: null,
};
const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    updateProfileStart: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateProfileFailed: (state, action) => {
      state.error = action.payload;
    },

    updatePasswordStart: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updatePasswordFailed: (state, action) => {
      state.error = action.payload;
    },

    reset: () => initialState,
  },
});

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailed,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailed,
  reset,
} = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
