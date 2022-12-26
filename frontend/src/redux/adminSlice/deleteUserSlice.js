import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleted: false,
  loading: false,
  error: null,
  message: "",
};

const deleteUserSlice = createSlice({
  name: "Delete User",
  initialState,
  reducers: {
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    deleteUserFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    reset: () => initialState,
  },
});

export const { deleteUserStart, deleteUserSuccess, deleteUserFailed, reset } =
  deleteUserSlice.actions;
export default deleteUserSlice.reducer;
