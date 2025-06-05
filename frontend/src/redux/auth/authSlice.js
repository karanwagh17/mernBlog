import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  isAuth: false,
  error: null,
};
 
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpsSuccess: (state) => {
      state.loading = false;
    },
    signuUperror: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerifyStart: (state) => {
      state.loading = true;
    },
    otpVerifysuccess: (state) => {
      state.loading = false;
    },
    otpVerifyerror: (state, action) => {
      state.error = action.payload;
    },
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    signuinerror: (state) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = false;
    },
    updateSuccess: (state, action) => {
      state.user = action.payload;
    },
    updateError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
  },
});

export const {
  updateSuccess,
  logout,
  updateError,
  updateStart,
  signinStart,
  signInSuccess,
  signuinerror,
  signUpStart,
  signUpsSuccess,
  signuUperror,
  otpVerifyStart,
  otpVerifysuccess,
  otpVerifyerror,
} = authSlice.actions;
export default authSlice.reducer;
