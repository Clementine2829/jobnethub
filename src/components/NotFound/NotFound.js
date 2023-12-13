import React from "react";
import "./NotFound.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="not-found-container">
        <h1 className="not-found-title">404 - Not Found</h1>
        <p className="not-found-message">
          The page you are looking for might not exist or has been moved.
        </p>
        <p className="not-found-message">
          <a style={{ "text-decoration": "none" }} href="/">
            Go back to home page
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
