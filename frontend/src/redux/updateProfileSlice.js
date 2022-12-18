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
    reset: () => initialState,
  },
});

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailed,
  reset,
} = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
