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
  },
});

export const { signInStart, signInFailure, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
