import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styleResume from "./CreateResume.module.css";

const CreateResume = () => {
  return (
    <>
      <Header />

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10 ${styleResume.data_container}`}>
          <h4>Use the form below to update your resume</h4>
        </div>
        <div className="col-sm-1"></div>
      </div>

      <Footer />
    </>
  );
};

export default CreateResume;
