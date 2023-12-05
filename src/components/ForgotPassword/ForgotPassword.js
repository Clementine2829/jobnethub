// ForgotPassword.js

import React, { useState } from "react";
import forgotPasswordStyles from "./ForgotPassword.module.css"; // Create a new CSS module for the forgot password styles
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform additional email validation if needed

    if (email) {
      try {
        // Call the forgot password API function or perform necessary logic
        // For simplicity, we'll just set a success message here
        setSuccessMessage("Password reset instructions sent to your email.");
      } catch (error) {
        console.error("Forgot password error:", error);
        // Handle error
        setErrorMessage("Failed to reset password. Please try again.");
      }
    } else {
      setErrorMessage("Please enter your email address.");
    }
  };

  return (
    <>
      <Header />
      <div className={`row`}>
        <div className={`col-sm-1`} />
        <div className={`col-sm-10`}>
          <div className={`${forgotPasswordStyles.form_container}`}>
            <form onSubmit={handleSubmit}>
              <div className={`${forgotPasswordStyles.sub_container}`}>
                <span className={`${forgotPasswordStyles.error_message}`}>
                  {errorMessage}
                </span>
                <span className={`${forgotPasswordStyles.success_message}`}>
                  {successMessage}
                </span>
              </div>
              <div className={`${forgotPasswordStyles.sub_container}`}>
                <label>
                  <span className={`fas fa-envelope`}></span>
                  <span>Email:</span>
                </label>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={validateEmail}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className={`${forgotPasswordStyles.sub_container}`}>
                <button
                  className={`${forgotPasswordStyles.submit_button}`}
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={`col-sm-1`} />
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
