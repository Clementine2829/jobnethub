import React, { useEffect, useState } from "react";
import jobCSS from "./RelatedJobs.module.css";

function RelatedJobs(props) {
  const { job } = props;

  let styleJobClosed = { color: "red" };
  const closingDate = (date) => {
    const closingDate = new Date(date);
    const currentDate = new Date();

    if (currentDate > closingDate) {
      const timeDifference = currentDate - closingDate;
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      styleJobClosed = { color: "red" };
      return `Closed ${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    } else {
      const timeDifference = closingDate - currentDate;
      const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      styleJobClosed = { color: "green" };
      return ` ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
    }
  };

  const [datePosted, setDatePosted] = useState(new Date());
  const transformedDate =
    job.date_created !== "" ? closingDate(job.date_created) : "";

  return (
    <div className={`${jobCSS.container}`}>
      <a href={`./` + job.job_id}>{job.job_title}</a>
      <br />
      {/* <span> - {job.jobType}</span><br /> */}
      <span>
        <span
          className={`fa fa-map-marker`}
          style={{ marginRight: "2%" }}
        ></span>
        {job.job_location}
      </span>
      {transformedDate && (
        <span>
          {`\t`}
          <span
            className={`fas fa-calendar-alt`}
            style={{ marginRight: "2%" }}
          ></span>
          <span style={styleJobClosed}>{transformedDate}</span>
        </span>
      )}
    </div>
  );
}

export default RelatedJobs;
