import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styleProfile from "../ViewProfile/ViewProfile.module.css";
import { getUser } from "../Server/Users";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [userFetched, setUserFetched] = useState(false);

  const dispatch = useDispatch;
  const { userId } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const _user = await getUser(userId);
        setUser(_user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };
    if (!userFetched) {
      fetchUser();
    }
  }, [userId]);

  const getDateOfBirth = (dateOfBirth) => {
    return dateOfBirth;
  };

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
              <div>
                <label>
                  <strong>First name</strong>
                </label>
                <span className={`${styleProfile.err}`} id="err_first_name">
                  {" "}
                  *{" "}
                </span>
                <br />
                <input
                  type="text"
                  value={user && user.firstname}
                  placeholder="Your First name"
                />
              </div>
              <div>
                <label>
                  <strong>Last name</strong>
                </label>
                <span className={`${styleProfile.err}`} id="err_first_name">
                  {" "}
                  *{" "}
                </span>
                <br />
                <input
                  type="text"
                  value={user && user.lastname}
                  placeholder="Your Surname"
                />
              </div>
              <div>
                <label>
                  <strong>Date of birth</strong>
                </label>
                <span className={`${styleProfile.err}`} id="err_date_of_birth">
                  {" "}
                  *{" "}
                </span>
                <br />
                <input
                  type="date"
                  value={
                    user && getDateOfBirth(user.dateOfBirth)
                  } /*max="<?php echo date("Y-m-d"); ?>"*/
                />
              </div>
              <div>
                <label>
                  <strong>Gender</strong>
                </label>
                <span className={`${styleProfile.err}`} id="err_gender">
                  {" "}
                  *{" "}
                </span>
                <br />
                <select>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className={`${styleProfile.sub_container}`}>
              <div>
                <label>
                  <strong>Phone Number</strong>
                </label>
                <span className={`${styleProfile.err}`} id="err_phone">
                  {" "}
                  *{" "}
                </span>
                <br />
                <input
                  type="number"
                  value={user && user.phone}
                  placeholder="Your primary phone number"
                />
              </div>
              <div>
                <label>
                  <strong>Email</strong>
                </label>
                <span className={`${styleProfile.err}`} id="err_your_email">
                  {" "}
                  *{" "}
                </span>
                <br />
                <input
                  type="email"
                  value={user && user.email}
                  placeholder="Your primary email address"
                />
              </div>
              <div>
                <label>
                  <strong>Address</strong>
                </label>
                <br />
                <input type="text" placeholder="Address line 1" />
                <span className={`${styleProfile.err}`} id="err_address_line_1">
                  {" "}
                  *{" "}
                </span>
                <br />
                <input type="text" placeholder="Address line 2" />
                <span
                  className={`${styleProfile.err}`}
                  id="err_address_line_2"
                ></span>
                <br />
                <input type="text" placeholder="City/Town" />
                <span className={`${styleProfile.err}`} id="err_city">
                  {" "}
                  *{" "}
                </span>
                <br />
                <input type="text" placeholder="Address code" />
                <span className={`${styleProfile.err}`} id="err_address_code">
                  {" "}
                  *{" "}
                </span>
              </div>
            </div>
            <div className={`${styleProfile.sub_container}`}>
              <span
                className={`${styleProfile.err}`}
                id="update_profile_response"
              ></span>
              <button>Submit changes</button>
            </div>
          </div>
        </div>
        <div className={`col-sm-1`}></div>
      </div>

      <Footer />
    </>
  );
};

export default UpdateProfile;
