import {
  SET_TOKEN,
  SET_REFRESH_TOKEN,
  LOGOUT,
  SET_USER_DATA,
} from "../constants";

export const setUser = (
  accessToken,
  userId,
  firstname,
  lastname,
  email,
  userRole
) => ({
  type: SET_USER_DATA,
  payload: { accessToken, userId, firstname, lastname, email, userRole },
});

export const setToken = (accessToken) => ({
  type: SET_TOKEN,
  payload: { accessToken },
});

export const setRefreshToken = (refreshToken) => ({
  type: SET_REFRESH_TOKEN,
  payload: refreshToken,
});

export const logout = () => ({
  type: LOGOUT,
});
