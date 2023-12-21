import React, { useEffect, useState } from "react";

function Employees(props) {
  const { index, job } = props;
  //   const [styleStatus, setStyleStatus] = useState({});

  //   useEffect(() => {}, []);

  return (
    <tr>
      <td>{job.index + 1}</td>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr>
        <a href="#" target="_blank">
          View CV
        </a>
      </tr>
    </tr>
  );
}

export default Employees;
