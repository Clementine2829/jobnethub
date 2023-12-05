import React, { useState } from "react";
import registerStyles from "./Signup.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { performRegistration } from "../Server/UsersFetcher";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [errorFirstNameMessage, setErrorFirstNameMessage] = useState(" * ");
  const [lastname, setLastname] = useState("");
  const [errorLastNameMessage, setErrorLastNameMessage] = useState(" * ");
  const [username, setUsername] = useState("");
  const [errorUsernameMessage, setErrorUsernameMessage] = useState(" * ");
  const [password, setPassword] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(" * ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] =
    useState(" * ");

  const validateFirstname = (event) => {
    setUsername(event.target.value);
  };

  const validateLastname = (event) => {
    setUsername(event.target.value);
  };

  const validateUsername = (event) => {
    setUsername(event.target.value);
  };

  const validatePasswords = (event) => {
    setPassword(event.target.value);
  };

  const validateConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmitRegistration = async (event) => {
    event.preventDefault();

    // Perform additional validation if needed

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      try {
        // Call the registration API function (performRegistration)
        const response = await performRegistration(username, password);

        // Handle the registration response as needed
        console.log("Registration response:", response);

        // Redirect or perform other actions after successful registration
      } catch (error) {
        console.error("Registration error:", error);
        // Handle registration error
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className={`row ${registerStyles.heading}`}>
        <h3>Create new account</h3>
        <p>Use the form below to create a new account.</p>
      </div>
      <div className={`row ${registerStyles.row}`}>
        <div className={`col-sm-1`} />
        <div className={`col-sm-6`}>
          <div className={`${registerStyles.form_container}`}>
            <form onSubmit={handleSubmitRegistration}>
              <div className={`${registerStyles.sub_container}`}>
                <span className={`${registerStyles.error_register_message}`}>
                  {errorMessage}
                </span>
              </div>
              <div className={`${registerStyles.sub_container}`}>
                <label>
                  <span>Firstname:</span>
                  <span className={`${registerStyles.error_register_message}`}>
                    {errorFirstNameMessage}
                  </span>
                </label>
                <br />
                <input
                  type="text"
                  value={firstname}
                  onChange={validateFirstname}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className={`${registerStyles.sub_container}`}>
                <label>
                  <span>Lastname:</span>
                  <span className={`${registerStyles.error_register_message}`}>
                    {errorLastNameMessage}
                  </span>
                </label>
                <br />
                <input
                  type="text"
                  value={lastname}
                  onChange={validateLastname}
                  placeholder="Enter your surname"
                  required
                />
              </div>
              <div className={`${registerStyles.sub_container}`}>
                <label>
                  <span>Username:</span>
                  <span className={`${registerStyles.error_register_message}`}>
                    {errorUsernameMessage}
                  </span>
                </label>
                <br />
                <input
                  type="email"
                  value={username}
                  onChange={validateUsername}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className={`${registerStyles.sub_container}`}>
                <label>
                  <span>Password:</span>
                  <span className={`${registerStyles.error_register_message}`}>
                    {errorPasswordMessage}
                  </span>
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
              <div className={`${registerStyles.sub_container}`}>
                <label>
                  <span>Confirm Password:</span>
                  <span className={`${registerStyles.error_register_message}`}>
                    {errorConfirmPasswordMessage}
                  </span>
                </label>
                <br />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={validateConfirmPassword}
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className={`${registerStyles.sub_container}`}>
                <button
                  className={`${registerStyles.register_submit}`}
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            <div className={`${registerStyles.last_container}`}>
              <div>
                <a href="#">Already have an account? Login</a>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-sm-4`}>hey hey new image</div>
        <div className={`col-sm-1`} />
      </div>
      <Footer />
    </>
  );
};

export default Register;
