import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import contact from "./Contact.module.css";

const Contacts = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !message) {
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      message,
    };
    const response = 
  };

  return (
    <>
      <Header />

      <div className={`row ${contact.row}`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-6`}>
          <h2>Contact us</h2>
          <p>Use the form to write to us.</p>
          <p>We would also like to hear from you on socials. Lets connect </p>
          <p className={`${contact.social}`}>
            <a href="#">
              <span className="fa fa-facebook"></span>
            </a>
            <a href="#">
              <span className="fa fa-twitter"></span>
            </a>
            <a href="#">
              <span className="fa fa-linkedin"></span>
            </a>
            <a href="#">
              <span className="fa fa-instagram"></span>
            </a>
            <a href="#">
              <span className="fa fa-whatsapp"></span>
            </a>
          </p>
        </div>
        <div className={`col-sm-4`}>
          <div className={`${contact.mainContainer}`}>
            <div className={`${contact.names} ${contact.container}`}>
              <label htmlFor="firstName">First Name *</label>
              <br />
              <input
                type="text"
                placeholder="Your name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span className={`${contact.err}`}></span>
            </div>
            <div className={`${contact.names} ${contact.container}`}>
              <label htmlFor="lastName">Last Name *</label>
              <br />
              <input
                type="text"
                placeholder="Your surname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className={`${contact.err}`}></span>
            </div>
            <div className={`${contact.container}`}>
              <label htmlFor="email">Email *</label>
              <br />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className={`${contact.err}`}></span>
            </div>
            <div className={`${contact.container}`}>
              <label htmlFor="message">What can we help you with * </label>
              <br />
              <textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className={`${contact.container}`}>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
        <div className={`col-sm-1`}></div>
      </div>

      <Footer />
    </>
  );
};

export default Contacts;
