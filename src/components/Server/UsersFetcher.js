import {
  loginAPI,
  signupAPI,
  forgotPasswordAPI,
  profileAPI,
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

  const {
    refreshToken,
    success,
    userId,
    firstname,
    lastname,
    email,
    userRole,
  } = await response.json();
  return {
    refreshToken,
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
export async function getUser(userId) {
  const url = profileAPI + "/" + userId;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      credentials: "include",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

const performRegistration = async (firstname, lastname, username, password) => {
  const response = await fetch(signupAPI, {
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

  console.log("response ok", response.ok);
  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return await response.json();
};

const performForgotPassword = async (email) => {
  const response = await fetch(forgotPasswordAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export { performLogin, performRegistration, performForgotPassword };
