import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { setAccessToken } from "../ReduxStateManagement/actions";
import {
  setRefreshToken,
  setToken,
  setUser,
} from "../ReduxStateManagement/actions/authActions";
import { refreshAccessTokenIfNeeded } from "../Server/TokenContext";

import login from "./Login.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { performLogin } from "../Server/UsersFetcher";

import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTo, setRedirectTo] = useState("./");

  const dispatch = useDispatch();

  const validateUsernane = (event) => {
    setUsername(event.target.value);
  };

  const validatePasswords = (event) => {
    setPassword(event.target.value);
  };

  const redirectToHref = (href = "./") => {
    window.location.href = href;
  };

  // const { accessToken, refreshToken } = useSelector((state) => {
  //   console.log("state.auth ", state.auth);
  //   return state.auth;
  // });
  // console.log("true accessToken ", accessToken);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // if (emailRegex.test(username) && passwordRegex.test(password)) {
    try {
      const { refreshToken, success, userId, firstname, lastname, email } =
        await performLogin(username, password);
      if (success) {
        dispatch(setRefreshToken(refreshToken));
        dispatch(setUser(userId, firstname, lastname, email));
        redirectToHref();
      } else {
        setErrorMessage("Invalid credentials.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { error: "Login failed. Please try again." },
      });
    }
    // } else {
    //   setErrorMessage("Invalid username or password");
    // }
  };

  return (
    <>
      <Header />
      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <div className={`${login.form_container}`}>
            <form onSubmit={handleSubmitLogin}>
              <div className={`${login.sub_container}`}>
                <span className={`${login.error_login_message}`}>
                  {errorMessage}
                </span>
              </div>
              <div className={`${login.sub_container}`}>
                <label>
                  <span className={`fas fa-user`}></span>
                  <span>Username:</span>
                </label>
                <br />
                <input
                  type="email"
                  value={username}
                  onChange={validateUsernane}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className={`${login.sub_container}`}>
                <label>
                  <span className={`fas fa-lock`}></span>
                  <span>Password:</span>
                </label>
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={validatePasswords}
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className={`${login.sub_container}`}>
                <button className={`${login.login_submit}`} type="submit">
                  Login
                </button>
              </div>
            </form>
            <div className={`${login.last_container}`}>
              <div>
                <a href="./forgot-password">Forgot password</a>
              </div>
              <div className={`${login.register}`}>
                <a href="./signup">Create new account</a>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-sm-1`}></div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
