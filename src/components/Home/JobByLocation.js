import React from "react";
import job from "./JobByLocation.module.css";
import johannesburgImage from "../../asserts/johannesburg.jpeg";
import pretoriaImage from "../../asserts/pretoria.jpeg";
import rustenburgImage from "../../asserts/Rustenburg-Mall.webp";
import remoteImage from "../../asserts/remote.jpg";

function JobByLocation(props) {
  return (
    <>
      <div className={`${job.heading}`}>
        <h5>Select by Location</h5>
      </div>
      <div className={`${job.mainContainer}`}>
        <div className={`${job.container}`}>
          <a href="jobs?location=johannesburg">
            <img src={johannesburgImage} alt="location" />
            <p className={`${job.textOnImage}`}>
              <strong>Johannesburg</strong>
            </p>
          </a>
        </div>
        <div className={`${job.container}`}>
          <a href="jobs?location=pretoria">
            <img src={pretoriaImage} alt="location" />
            <p className={`${job.textOnImage}`}>
              <strong>Pretoria</strong>
            </p>
          </a>
        </div>
        <div className={`${job.container}`}>
          <a href="jobs?location=rustenburg">
            <img src={rustenburgImage} alt="location" />
            <p className={`${job.textOnImage}`}>
              <strong>Rustenburg</strong>
            </p>
          </a>
        </div>
        <div className={`${job.container}`}>
          <a href="jobs?location=remote">
            <img src={remoteImage} alt="location" />
            <p className={`${job.textOnImage}`}>
              <strong>Remote</strong>
            </p>
          </a>
        </div>
      </div>
    </>
  );
}

export default JobByLocation;
