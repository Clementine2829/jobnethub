import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../asserts/logo2.png";
import header from "./Header.module.css";
import Paths from "./PathConstants";

const Header = (props) => {
  const navigate = useNavigate();
  const [activeWindow, setActiveWindow] = useState(getAbsolutePath());
  const [loggedIn, setLoggedIn] = useState(!!props.user);

  useEffect(() => {
    setActiveWindow(getAbsolutePath());
    setLoggedIn(!!props.user);
  }, [props.user]);

  function getAbsolutePath() {
    const absoluteURL = window.location.href;
    const urlObject = new URL(absoluteURL);
    return urlObject.pathname;
  }

  const navigateTo = (url) => {
    window.location.href = url;
  };

  const navigateToLogin = () => {
    navigate(Paths.LOGIN);
  };

  const navigateToRegister = () => {
    navigate(Paths.REGISTER);
  };

  const renderAuthButtons = () => {
    if (!loggedIn) {
      return (
        <div className="d-flex">
          <li class={`nav-item dropdown ${header.navListItems}`}>
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
            >
              <span className={`fas fa-user-alt`}></span>
            </a>
            <ul class={`dropdown-menu ${header.navListItems}`}>
              <li>
                <a class="dropdown-item" href="#">
                  View Profile
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Edit Profile
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Change Password
                </a>
              </li>
              <li
                style={{
                  paddingTop: "4%",
                }}
              >
                <a class="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </div>
      );
    } else {
      return (
        <div className="d-flex">
          <button
            onClick={() => navigateTo(Paths.REGISTER)}
            className={`${header.btnHeader} ${header.btnCreateAccount}`}
          >
            Create account
          </button>
          <button
            onClick={() => navigateToLogin()}
            className={`${header.btnHeader} ${header.btnLogin}`}
          >
            Login
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <nav className={`${header.nav} navbar navbar-expand-sm navbar-dark`}>
        <div className="container-fluid">
          <div>
            <a
              className="navbar-brand"
              onClick={() => (window.location.href = "./")}
              href="#"
            >
              <img src={logo} className={header.navLogo} alt="logo" />
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarlinks"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarlinks">
            <ul className={`navbar-nav mx-auto ${header.navLinks}`}>
              <li className={`nav-item ${header.navLinkItem}`}>
                <a
                  className={`nav-link 
                                    ${
                                      activeWindow === Paths.HOME
                                        ? "active"
                                        : ""
                                    }`}
                  onClick={() => (window.location.href = Paths.HOME)}
                  href="#"
                >
                  HOME
                </a>
              </li>
              <li className={`nav-item ${header.navLinkItem}`}>
                <a
                  className={`nav-link 
                                    ${
                                      activeWindow === Paths.JOBS
                                        ? "active"
                                        : ""
                                    }`}
                  onClick={() => (window.location.href = Paths.JOBS)}
                  href="#"
                >
                  JOBS LISTING
                </a>
              </li>
              <li className={`nav-item ${header.navLinkItem}`}>
                <a
                  className={`nav-link 
                                    ${
                                      activeWindow === Paths.JOBS_UPDATE
                                        ? "active"
                                        : ""
                                    }`}
                  onClick={() => (window.location.href = Paths.JOBS_UPDATE)}
                  href="#"
                >
                  POST A JOB
                </a>
              </li>
              <li className={`nav-item ${header.navLinkItem}`}>
                <a
                  className={`nav-link 
                                    ${
                                      activeWindow === Paths.ABOUT_US
                                        ? "active"
                                        : ""
                                    }`}
                  onClick={() => (window.location.href = Paths.ABOUT_US)}
                  href="#"
                >
                  ABOUT US
                </a>
              </li>
              <li className={`nav-item ${header.navLinkItem}`}>
                <a
                  className={`nav-link 
                                    ${
                                      activeWindow === Paths.CONTACT_US
                                        ? "active"
                                        : ""
                                    }`}
                  onClick={() => (window.location.href = Paths.CONTACT_US)}
                  href="#"
                >
                  CONTACT US
                </a>
              </li>
            </ul>
            {renderAuthButtons()}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
