import React, { useState, useEffect } from "react";
import styleProfile from "./ViewProfile.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { getUser } from "../Server/UsersFetcher";
import { useSelector } from "react-redux";

const ViewProfile = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    gender: "",
    role: "",
    address: "",
    status: "",
  });

  const { accessToken } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const _user = await getUser(accessToken);
        setUser(_user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };
    if (accessToken != null) {
      fetchUser();
    }
  }, [accessToken]);

  return (
    <>
      <Header />

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <div className={`${styleProfile.heading}`}>
            <h3>Personal Details</h3>
          </div>
          <div className={`${styleProfile.image}`}>
            <div className={`${styleProfile.dp_container}`}>
              <img src="./images/users/image" alt="image" />
              <a href="#">
                <span className={`fa fa-camera`}></span> Edit
              </a>
            </div>
          </div>
          <div className={`${styleProfile.user_info}`}>
            <div className={`${styleProfile.sub_container}`}>
              <p>
                <strong>Full name</strong>
              </p>
              <span>{user.firstname + " " + user.lastname}</span>
            </div>
            <div className={`${styleProfile.sub_container}`}>
              <p>
                <strong>Date of birth</strong>
              </p>
              <span>{user.dateOfBirth}</span>
            </div>
            <div className={`${styleProfile.sub_container}`}>
              <p>
                <strong>Contact</strong>
              </p>
              <span>
                <span className={`fas fa-envelope`}></span> {user.email}
                <br />
                <span className={`fas fa-phone`}></span> {user.phone}
              </span>
            </div>
            <div className={`${styleProfile.sub_container}`}>
              <p>
                <strong>Gender</strong>
              </p>
              <span>{user.gender}</span>
            </div>
            <div className={`${styleProfile.sub_container}`}>
              <p>
                <strong>Role</strong>
              </p>
              <span>{user.role}</span>
            </div>

            <div className={`${styleProfile.sub_container}`}>
              <p>
                <strong>Address</strong>
              </p>
              <span>{user.address}</span>
            </div>
            <div className={`${styleProfile.sub_container}`}>
              {user.status === "notActivated" ? (
                <>
                  <p style={{ marginTop: "10px" }}>
                    <strong>Activate account:</strong>
                  </p>
                  <span style={{ color: "red" }}>
                    Your account is not activated yet. Click{" "}
                    <a href="#">here</a> to activate it.
                    <br />
                    <br />
                  </span>
                </>
              ) : (
                ""
              )}
              <p>
                <strong>Job applications:</strong>
              </p>
              <span>
                <a href="./job-applications">View my job applications </a>
                <br />
                <br />
              </span>
              <p>
                <strong>Invite a friend:</strong>
              </p>
              <span>
                Invite a friend to earn referals points. Copy and share this
                link <a href="#">https://jobnesthub.com/signup?ref=ref_code</a>
                <br />
                Or Share this code CODE: ref_code to be used on signup page as
                ref code
              </span>
            </div>
          </div>
        </div>
        <div className={`col-sm-1`}></div>
      </div>
      <Footer />
    </>
  );
};

export default ViewProfile;
