import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import StyleApplications from "./MyJobApplications.module.css";
import { getJobApplications } from "../Server/Jobs";
import JobApplications from "./JobApplications";
import { useSelector } from "react-redux";

const MyJobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);
  // const [styleApproved, setStyleApproved] = useEffect({ display: "none" });
  const styleApproved = { display: "none" };
  const { accessToken } = useSelector((state) => {
    console.log(state.auth);
    return state.auth;
  });
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const _jobApplications = await getJobApplications(accessToken);
        setJobApplications(_jobApplications);
        // _jobApplications.map((job, index) => ({}));
        for (let i = 0; i < jobApplications.length; i++) {
          console.log(jobApplications[i]);
          if (_jobApplications[i].status === "Approved") {
            //   setStyleApproved({ display: "inline-block" });
            styleApproved = { display: "inline-block" };
            break;
          }
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    if (accessToken != null) {
      fetchJob();
    }
  }, [accessToken]);

  return (
    <>
      <Header />
      <div className={`${StyleApplications.container}`}>
        <h4>View my job applications</h4>
        <div className={`${StyleApplications.sub_container}`}>
          <p style={styleApproved} className={`${StyleApplications.approved}`}>
            Congradulations, one of your applications have been approved.
          </p>
          {jobApplications.length > 0 ? (
            <div>
              <p style={{ marginBottom: "2px" }}>
                Select the job application that you got approve and to approve
                or reject the offer
                <br />
                <small style={{ color: "red" }}>
                  Please note that once you have accepted/declied an
                  application, you cannot change the status until reviewed by a
                  manager
                </small>
              </p>
              <select className={StyleApplications.job_title}>
                {jobApplications.map((job) => (
                  <option key={job.jobId} value={job.jobId}>
                    {job.job}
                  </option>
                ))}
              </select>
              <select className={`${StyleApplications.action}`}>
                <option value={"approve "}>Approve </option>
                <option value={"decline"}>Decline </option>
              </select>
              <button className={`${StyleApplications.submit_results}`}>
                Submit
              </button>
              <table>
                <colgroup>
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>
                      Date <br />
                      approved/
                      <br />
                      rejected
                    </th>
                    <th></th>
                  </tr>
                  {jobApplications.map((job, index) => (
                    <JobApplications key={index} job={job} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <br />
              <p style={{ color: "red", textAlign: "center" }}>
                Job applications not found
              </p>
            </div>
          )}
          <p style={{ color: "brown", marginTop: "2%", textAlign: "center" }}>
            If you have previously applied and some of your applications are not
            listed, <a href="#">click</a> here to sychronize them with your
            account
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyJobApplications;
