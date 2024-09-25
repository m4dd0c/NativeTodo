import { createReducer } from "@reduxjs/toolkit";

const authReducer = createReducer(
  { loading: false, isAuth:false },
  {
    // get user
    getUserReq: (state) => {
      state.loading = true;
      state.isAuth = false;
    },
    getUserRes: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuth = true;
    },
    getUserRej: (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    // edit user
    editUserReq: (state) => {
      state.loading = true;
    },
    editUserRes: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.path = "profile";
    },
    editUserRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete user
    deleteUserReq: (state) => {
      state.loading = true;
    },
    deleteUserRes: (state, action) => {
      state.loading = false;
      state.mesasge = action.payload.message;
      state.isAuth = false;
    },
    deleteUserRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // signup
    signupReq: (state) => {
      state.loading = true;
      state.isAuth = false;
    },
    signupRes: (state, action) => {
      state.loading = false;
      state.mesasge = action.payload.message;
      state.user = action.payload.userInfo;
      state.isAuth = true;
      state.path = "profile";
    },
    signupRej: (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    // login
    loginReq: (state) => {
      state.loading = true;
      state.isAuth = false;
    },
    loginRes: (state, action) => {
      state.loading = false;
      state.mesasge = action.payload.message;
      state.user = action.payload.userInfo;
      state.isAuth = true;
      state.path = "profile";
    },
    loginRej: (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    // logout
    logoutReq: (state) => {
      state.loading = true;
    },
    logoutRes: (state, action) => {
      state.loading = false;
      state.mesasge = action.payload.message;
      state.isAuth = false;
      state.path = "login";
    },
    logoutRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // changePassword user
    changePasswordReq: (state) => {
      state.loading = true;
    },
    changePasswordRes: (state, action) => {
      state.loading = false;
      state.mesasge = action.payload.message;
      state.path = "profile";
    },
    changePasswordRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // forgetPassword user
    forgetPasswordReq: (state) => {
      state.loading = true;
    },
    forgetPasswordRes: (state, action) => {
      state.loading = false;
      state.mesasge = action.payload.message;
      state.path = "resetPassword";
    },
    forgetPasswordRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.path = "forget";
    },
    // resetPassword user
    resetPasswordReq: (state) => {
      state.loading = true;
    },
    resetPasswordRes: (state, action) => {
      state.loading = false;
      state.mesasge = action.payload.message;
      state.path = "login";
    },
    resetPasswordRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // state.path = ''
    },
    // verify user
    verifyUserReq: (state) => {
      state.loading = true;
    },
    verifyUserRes: (state, action) => {
      state.loading = false;
      state.mesasge = action.payload.message;
      state.path = "profile";
    },
    verifyUserRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // clear message error
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearPath: (state) => {
      state.path = null;
    },
  }
);
export default authReducer;
