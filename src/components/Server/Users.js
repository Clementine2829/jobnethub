import axios from "axios";
import {
  loginAPI,
  signupAPI,
  forgotPasswordAPI,
  profileAPI,
  contactUs,
  sendSubscriptionEmailAPI,
} from "./apiConstants";

const performLogin = async (username, password) => {
  const response = await fetch(loginAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed. Invalid credentials.");
  }

  const { accessToken, success, userId, firstname, lastname, email, userRole } =
    await response.json();
  return {
    accessToken,
    success,
    userId,
    firstname,
    lastname,
    email,
    userRole,
  };
};
const getRefreshToken = async () => {
  const response = await fetch(loginAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Refresh token failed. Please log in again.");
  }

  const { accessToken } = await response.json();
  return { accessToken };
};
export const logout = () => {
  // Dispatch a logout action
  return { type: "LOGOUT" };
};
export async function getUser(token) {
  console.log(token);
  try {
    const response = await axios.get(profileAPI, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching job applications: ${error.message}`);
  }
}

const performRegistration = async (firstname, lastname, username, password) => {
  const response = await fetch(contactUs, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      email: username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return await response.json();
};

const sendSubscriptionEmail = async (email) => {
  const response = await fetch(sendSubscriptionEmailAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok) {
    throw new Error("Subscription failed");
  }

  return await response.json();
};

const performForgotPassword = async (email, token) => {
  const response = await fetch(forgotPasswordAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
    body: JSON.stringify({
      email,
    }),
  });

  console.log("response ok", response.ok);
  if (!response.ok) {
    throw new Error("Forgot password failed");
  }

  return await response.json();
};

export {
  performLogin,
  performRegistration,
  performForgotPassword,
  sendSubscriptionEmail,
};
