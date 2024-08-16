import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    signInSuccess: (state, action) => {
      (state.loading = false),
        (state.error = null),
        (state.currentUser = action.payload);
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    updateSuccess: (state, action) => {
      (state.loading = false),
        (state.error = null),
        (state.currentUser = action.payload);
    },
    updateFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    deleteStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    deleteSuccess: (state) => {
      (state.loading = false), (state.currentUser = null), (state.error = null);
    },
    deleteError: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signOutSuccess: (state) => {
      (state.currentUser = null), 
      (state.loading = false),
      (state.error = false);
    }
  },
});

export const {
  signInStart,
  signInFailure,
  signInSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteError,
  signOutSuccess
} = userSlice.actions;

export default userSlice.reducer;
