import axios from "axios";
import { SERVER_URI } from "../store";
export const instance = axios.create({
  baseURL: SERVER_URI + "api/v1",
  withCredentials: true,
});

// signup editprofile parameters -- pending

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginReq" });
    const { data } = await instance.post(
      "/user/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "loginRes", payload: data });
  } catch (error) {
    dispatch({
      type: "loginRej",
      payload: error.response.data.error,
    });
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "signupReq" });
    const { data } = await instance.post("/user/signup", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: "signupRes", payload: data });
  } catch (error) {
    dispatch({
      type: "signupRej",
      payload: error.response.data.message,
    });
  }
};

export const editProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "editUserReq" });
    const { data } = await instance.put("/user/me", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: "editUserRes", payload: data });
  } catch (error) {
    dispatch({ type: "editUserRej", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "getUserReq" });
    const { data } = await instance.get("/user/me");
    dispatch({ type: "getUserRes", payload: data });
  } catch (error) {
    dispatch({ type: "getUserRej", payload: error.response.data.message });
  }
};

export const deleteUser = () => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserReq" });
    const { data } = await instance.delete("/user/me");
    dispatch({ type: "deleteUserRes", payload: data });
  } catch (error) {
    dispatch({ type: "deleteUserRej", payload: error.response.data.message });
  }
};

export const changePasswordAction =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "changePasswordReq" });
      const { data } = await instance.put(
        "/user/password/change",
        { oldPassword, newPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({ type: "changePasswordRes", payload: data });
    } catch (error) {
      dispatch({
        type: "changePasswordRej",
        payload: error.response.data.message,
      });
    }
  };

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetPasswordReq" });
    const { data } = await instance.post(
      "/user/password/forget",
      { email },
      {
        withCredentials: false,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "forgetPasswordRes", payload: data });
  } catch (error) {
    dispatch({
      type: "forgetPasswordRej",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (otp, password) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordReq" });
    const { data } = await instance.put(
      "/user/password/reset",
      { otp, password },
      {
        withCredentials: false,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "resetPasswordRes", payload: data });
  } catch (error) {
    dispatch({
      type: "resetPasswordRej",
      payload: error.response.data.message,
    });
  }
};

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "verifyUserReq" });
    const { data } = await instance.put(
      "/user/verify",
      { otp },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "verifyUserRes", payload: data });
  } catch (error) {
    dispatch({ type: "verifyUserRej", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutReq" });
    const { data } = await instance.get("/user/logout");
    dispatch({ type: "logoutRes", payload: data });
  } catch (error) {
    dispatch({ type: "logoutRej", payload: error.response.data.message });
  }
};
