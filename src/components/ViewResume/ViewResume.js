import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styleResume from "./ViewResume.module.css";

const ViewResume = () => {
  return (
    <>
      <Header />

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10 ${styleResume.data_container}`}>
          <div className={`${styleResume.resume_header}`}>
            <div className={`${styleResume.resume_logo}`}>
              <a href="./">
                <img
                  src=""
                  alt="logo"
                  style={{ width: "100%", height: "100%" }}
                />
              </a>
            </div>
            <div className={`${styleResume.resume_templates}`}>
              <div className={`${styleResume.template_btn}`}>
                <button>Template 4</button>
              </div>
              <div className={`${styleResume.template_btn}`}>
                <button>Template 3</button>
              </div>
              <div className={`${styleResume.template_btn}`}>
                <button>Template 2</button>
              </div>
              <div className={`${styleResume.template_btn}`}>
                <button>Template 1</button>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-sm-1`}></div>
      </div>

      <Footer />
    </>
  );
};

export default ViewResume;
