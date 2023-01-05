import { createSlice } from "@reduxjs/toolkit";
import api from "../lib/api";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Slice
const slice = createSlice({
  name: "user",

  initialState: {
    user: initialUser,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export default slice.reducer;

// Actions
const { loginSuccess, logoutSuccess } = slice.actions;

export const login = ({ username, password }) => async (dispatch) => {
  function onSuccess(res) {
    dispatch(loginSuccess({ accessToken: res.data.access }));
    return res;
  }

  function onError(error) {
    return {error};
  }

  try {
    const res = await api.post("/token/", { username, password });
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};

export const register = ({ username, email, password }) => async () => {
  function onSuccess(res) {
    return res;
  }

  function onError(error) {
    return {error};
  }

  try {
    const res = await api.post("/users/", { username, email, password });
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};

export const logout = () => (dispatch) => {
  return dispatch(logoutSuccess());
};
