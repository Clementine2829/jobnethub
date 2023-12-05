import { loginAPI, signupAPI } from "./apiConstants";

const performLogin = async (username, password) => {
  const response = await fetch(loginAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: username, password }),
  });

  // console.log('response ok', response.ok)
  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  // console.log('response data', data)
  return data.token; // returns token
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
