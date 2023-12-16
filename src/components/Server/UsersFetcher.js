import { loginAPI, signupAPI, forgotPasswordAPI } from "./apiConstants";

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

  const { refreshToken, success, userId, firstname, lastname, email } =
    await response.json();
  return { refreshToken, success, userId, firstname, lastname, email };
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
