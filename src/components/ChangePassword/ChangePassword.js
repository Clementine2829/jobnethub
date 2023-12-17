import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styleChangePassword from "../ViewProfile/ViewProfile.module.css";

const ChangePassword = () => {
  return (
    <>
      <Header />

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <div className={`${styleChangePassword.heading}`}>
            <h3>Change password</h3>
          </div>
          <div className={`${styleChangePassword.user_info}`}>
            <form className="change_password_form" method="post" action="./">
              <div className={`${styleChangePassword.sub_container}`}>
                <div className={`${styleChangePassword.sub_container}`}>
                  <div>
                    <label>
                      <strong>Old password</strong>
                    </label>
                    <span
                      className={`${styleChangePassword.err} ${styleChangePassword.err_old_password}`}
                    >
                      {" "}
                      *{" "}
                    </span>
                    <br />
                    <input type="password" placeholder="Your old password" />
                  </div>
                  <div>
                    <label>
                      <strong>New password</strong>
                    </label>
                    <span
                      className={`${styleChangePassword.err} ${styleChangePassword.err_new_password}`}
                    >
                      {" "}
                      *{" "}
                    </span>
                    <br />
                    <input type="password" placeholder="New password" />
                  </div>
                  <div>
                    <label>
                      <strong>Confirm password</strong>
                    </label>
                    <span
                      className={`${styleChangePassword.err} ${styleChangePassword.err_confirm_password}`}
                    >
                      {" "}
                      *{" "}
                    </span>
                    <br />
                    <input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
              </div>
              <div className={`${styleChangePassword.sub_container}`}>
                <span
                  className={`${styleChangePassword.err} ${styleChangePassword.update_profile_response}`}
                ></span>
                <input
                  type="button"
                  className={`${styleChangePassword.change_password}`}
                  value="Submit changes"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>

      <Footer />
    </>
  );
};

export default ChangePassword;
