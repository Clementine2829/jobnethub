import React, { useEffect, useState } from "react";

function JobApplications(props) {
  const { index, job } = props;
  const [styleStatus, setStyleStatus] = useState({});

  useEffect(() => {
    if (job.status === "Rejected") setStyleStatus({ color: "red" });
    else if (job.status === "Pending") setStyleStatus({ color: "purple" });
    else if (job.status === "Approved") setStyleStatus({ color: "blue" });
  }, []);

  const dateModified = (dateMod) => {
    return dateMod.slice(0, 19).replaceAll("T", " ").replaceAll("-", "/");
  };
  return (
    <tr>
      <td>{job.index + 1}</td>
      <td>{job.job}</td>
      <td>
        <a href="#" style={{ textDecoration: "none" }}>
          {job.company}
        </a>
      </td>
      <td style={styleStatus}>{job.status}</td>
      <td>{dateModified(job.dateMod)}</td>
    </tr>
  );
}

export default JobApplications;
