import React from "react";
import jobs from "./JobItem.module.css";

function CheckDescription(description) {
  if (description.length > 200) return <>{description.slice(0, 200)}...</>;
  else return <>{description}</>;
}

function formatDateToMMDDYYYY(dateString) {
  const date = new Date(dateString);
  const mm = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
  const dd = date.getDate().toString().padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}
const datePosted = (date) => {
  const datePosted = new Date(date);
  const datePostedDay = datePosted.getDate();
  const datePostedMonth = datePosted.toLocaleString("default", {
    month: "short",
  });
  const datePostedYear = datePosted.getFullYear();
  const datePostedString = `${datePostedDay} ${datePostedMonth} ${datePostedYear}`;
  return datePostedString;
};
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

let salary = (salary) => {
  return `R${salary}`;
};

function JobItem(props) {
  return (
    <div
      onClick={() => (window.location.href = "./jobs/" + props.id)}
      className={`${jobs.jobContainer}`}
    >
      <input type="hidden" value={props.id} />
      <h3>
        {props.jobTitle}{" "}
        {props.remoteJob && <span className={`${jobs.remoteJob}`}>Remote</span>}
      </h3>
      <p className={`${jobs.company}`}>
        <span className={`fas fa-building`}></span>
        <span className={`${jobs.companyLink}`}>
          {props.company.company_name}
        </span>
        <span className={`fa fa-map-marker`}></span>
        <span>{props.location}</span>
        <span className={`fa fa-money`}></span>
        <span>{salary(props.salary)}</span>
      </p>
      <p>{CheckDescription(props.description)}</p>
      <p className={`${jobs.datePosted}`}>
        <span>Posted: {datePosted(props.datePosted)}</span>
        <span style={styleJobClosed}>{closingDate(props.datePosted)}</span>
        <span className={`far fa-heart`}></span>
        <span className={`fa fa-envelope-o`}></span>
      </p>
    </div>
  );
}

export default JobItem;
