import React, { Component } from "react";
import login from "./Login.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { performLogin } from "../Server/UsersFetcher";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      username: "",
      password: "",
    };
  }

  validateUsernane = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  validatePasswords = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleSubmitLogin = async (event) => {
    // event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // alert('Login successful started');

    if (emailRegex.test(username) && passwordRegex.test(password)) {
      try {
        const response = await performLogin(username, password);

        console.log("response here ", response);

        // if (!response.ok) {
        //   const errorMessage = await response.text(); // assuming the error message is in the response body
        //   throw new Error(`Login failed: ${errorMessage}`);
        // }
        // alert('Login successful');

        // const data = await response.json();
        // console.log('data', data);
        // alert('Login successful ' + data);
        // setGlobalToken(data.token);
        // Redirect or perform other actions after successful login
      } catch (error) {
        alert("Login successful error " + error);
        console.log(error);
        // Handle login error
      }
    } else {
      this.setState({
        errorMessage: "Invalid username or password",
      });
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className={`row`}>
          <div className={`col-sm-1`}></div>
          <div className={`col-sm-10`}>
            <div className={`${login.form_container}`}>
              <form onSubmit={this.handleSubmitLogin}>
                <div className={`${login.sub_container}`}>
                  <span className={`${login.error_login_message}`}>
                    {this.state.errorMessage}
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
                    value={this.state.username}
                    onChange={this.validateUsernane}
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
                    value={this.state.password}
                    onChange={this.validatePasswords}
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
                  <a href="#">Forgot password</a>
                </div>
                <div className={`${login.register}`}>
                  <a href="#">Create new account</a>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-sm-1`}></div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Login;
