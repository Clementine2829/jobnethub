import axios from "axios";
import { setToken } from "./actions/authActions";
import { logout } from "../Server/Users";

const TOKEN_STORAGE_KEY = "accessToken";

export const checkAccessToken = () => {
  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  return !!storedToken;
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const refreshAccessTokenIfNeeded = async (dispatch) => {
  const storedToken = getAccessToken();

  if (!storedToken) {
    // No token to refresh
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/refresh", {
      refreshToken: getRefreshToken(), // Make sure you have a function to get the refresh token
    });

    const newAccessToken = response.data.accessToken;

    // Update the stored access token
    dispatch(setToken(newAccessToken));
  } catch (error) {
    console.error("Token refresh error:", error.response?.data.error);

    // Handle the error, e.g., log out the user
    dispatch(logout());
  }
};

// You may also want to have a function to get the refresh token from wherever it's stored
const getRefreshToken = () => {
  // Implement logic to retrieve the refresh token (e.g., from cookies)
  // Return the refresh token
};

// Feel free to add more functions or modify based on your specific requirements
