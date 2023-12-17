import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styleJob from "./ViewJob.module.css";
import JobsFunction from "./JobsFunction";
import DataFetcher, {
  getCompanyJobs,
  getJobById,
  getRelatedJobs,
} from "../Server/Jobs";
import RelatedJobs from "./RelatedJobs";

const ViewJob = () => {
  const { job: jobId } = useParams();
  const [job, setJob] = useState({ job_id: jobId });
  const [jobDataFetched, setJobDataFetched] = useState(false);
  const [relatedJobsDataFetched, setRelatedJobsDataFetched] = useState(false);
  const [companyDataJobsDataFetched, setCompanyDataJobsDataFetched] =
    useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);

  const [styleRequirementDev, setStyleRequirementDev] = useState({
    display: "none",
  });
  const [styleQualificationDev, setStyleQualificationDev] = useState({
    display: "none",
  });
  const [styleDutiesDev, setStyleDutiesDev] = useState({ display: "none" });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(job.job_id);
        const jobObject = {
          ...jobData,
          company: JSON.parse(jobData.company),
          category: JSON.parse(jobData.category),
        };
        setJob(jobObject);
        setJobDataFetched(true);

        if (
          jobData.job_requirements !== undefined &&
          jobData.job_requirements !== null &&
          jobData.job_requirements.length > 0 &&
          jobData.job_requirements[0].requirement !== ""
        ) {
          setStyleRequirementDev({ display: "block" });
        }
        if (
          jobData.job_qualifications !== undefined &&
          jobData.job_qualifications !== null &&
          jobData.job_qualifications.length > 0 &&
          jobData.job_qualifications[0].qualification !== ""
        ) {
          setStyleQualificationDev({ display: "block" });
        }
        if (
          jobData.job_duties !== undefined &&
          jobData.job_duties !== null &&
          jobData.job_duties.length > 0 &&
          jobData.job_duties[0].duty !== ""
        ) {
          setStyleDutiesDev({ display: "block" });
        }

        if (jobData.relatedJobs) {
          setRelatedJobs(jobData.relatedJobs);
        }
        if (jobData.companyJobs) {
          setCompanyJobs(jobData.companyJobs);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    // const fetchRelatedJob = async () => {
    //   try {
    //     const jobs = await getRelatedJobs(job.category.category_id);
    //     setRelatedJobs(jobs);
    //     setRelatedJobsDataFetched(true);
    //   } catch (error) {
    //     console.error("Error fetching related job data:", error);
    //   }
    // };

    // const fetchCompanyJob = async () => {
    //   try {
    //     const jobs = await getCompanyJobs(job.company.company_id);
    //     setCompanyJobs(jobs);
    //     setCompanyDataJobsDataFetched(true);
    //   } catch (error) {
    //     console.error("Error fetching  company job data:", error);
    //   }
    // };

    // Fetch data only if it hasn't been fetched before
    if (!jobDataFetched) {
      fetchJob();
    }
  }, [
    job.job_id,
    jobDataFetched,
    relatedJobsDataFetched,
    companyDataJobsDataFetched,
  ]);

  // const onRelatedJobsFetched = (data) => {
  //   const parsedData = data.map((item) => ({
  //     ...item,
  //     company: JSON.parse(item.company),
  //     category: JSON.parse(item.category),
  //   }));
  //   setRelatedJobs(parsedData);
  // };

  // const onCompanyJobsFetched = (data) => {
  //   const parsedData = data.map((item) => ({
  //     ...item,
  //     company: JSON.parse(item.company),
  //     category: JSON.parse(item.category),
  //   }));
  //   setCompanyJobs(parsedData);
  // };

  const applyForJob = () => {
    alert("Applying for job " + job.job_id);
  };

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

  const closingDate = (date) => {
    const closingDate = new Date(date);
    const currentDate = new Date();

    const closingDateDay = closingDate.getDate();
    const closingDateMonth = closingDate.toLocaleString("default", {
      month: "short",
    });
    const closingDateYear = closingDate.getFullYear();
    const closingDateString = `${closingDateDay} ${closingDateMonth} ${closingDateYear}`;

    // Calculate days left
    const timeDifference = closingDate - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return `(Closing date: ${closingDateString}, ${daysLeft} day${
      daysLeft !== 1 ? "s" : ""
    } left)`;
  };
  const onJobFetched = (data) => {
    // Handle data as needed
    console.log(data);
  };
  return (
    <>
      <Header />
      <DataFetcher
        fetchFunction={() => getJobById(jobId)}
        onDataFetched={onJobFetched}
      />
      {/* <DataFetcher
        fetchFunction={() => getRelatedJobs(jobId)}
        onDataFetched={onJobFetched}
      /> */}

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-3 ${styleJob.otherJobContainer}`}>
          <div className={`${styleJob.container}`}>
            <div className={`${styleJob.subContainer}`}>
              <div className={`${styleJob.header}`}>
                <h4>Get notifications for jobs related to this</h4>
              </div>
              <div className={`${styleJob.body}`}>
                <label htmlFor="email">Email address</label>
                <span> * </span>
                <input type="email" placeholder="Enter your email" />
                <button>
                  <span
                    className={`fas fa-bell`}
                    style={{ marginRight: "5%" }}
                  ></span>
                  Create a new job alert
                </button>
              </div>
            </div>
            <div className={`${styleJob.subContainer}`}>
              <div className={`${styleJob.jobs}`}>
                <h4>Jobs available in this company</h4>
                <div className={`${styleJob.jobList}`}>
                  {companyJobs.length > 0 ? (
                    <ul>
                      {companyJobs.map((job, index) => (
                        <li key={index}>
                          <RelatedJobs job={job} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: "red" }}>Company jobs not found</p>
                  )}
                </div>
              </div>
            </div>
            <div className={`${styleJob.subContainer}`}>
              <div className={`${styleJob.jobs}`}>
                <h4>Related jobs</h4>
                <div className={`${styleJob.jobList}`}>
                  {relatedJobs.length > 0 ? (
                    <ul>
                      {relatedJobs.map((job, index) => (
                        <li key={index}>
                          <RelatedJobs job={job} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: "red" }}>Related jobs not found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-sm-7 ${styleJob.mainJobContainerAtServer}`}>
          <div className={`${styleJob.jobContainer}`}>
            <div className={`${styleJob.imageContainer}`}>
              {/* <img src={imgURL} alt={`Company logo`} style={{"height": "100%", "width": "auto"}} />                                 */}
            </div>
            <div className={`${styleJob.description}`}>
              <h4>
                {job.job_title}
                <span className={`${styleJob.remote}`}>
                  {job.remote_work ? "Remote" : ""}
                </span>
              </h4>
              <p>
                <span
                  className={`fas fa-building`}
                  style={{ marginRight: " 5px" }}
                ></span>
                <a href="#" style={{ textDecoration: "none" }}>
                  {job.company != null ? job.company.company_name : ""}
                </a>
              </p>
              <p>
                <span
                  className={`fa fa-map-marker`}
                  style={{ marginRight: " 5px" }}
                ></span>
                {job.job_location}
              </p>
              <p>{job.job_type != null ? `Job Type: ${job.job_type}` : ""}</p>
              <p>
                Salary: <span>{job.job_salary}</span>
              </p>
              <p>
                Date posted: {datePosted(job.date_updated)}
                {job.closing_date != null
                  ? ` ${closingDate(job.closing_date, job.date_updated)}`
                  : ""}
              </p>
              <p>
                Reference: <span>{job.job_ref}</span>
              </p>
              <p className={`${styleJob.share}`}>
                <span
                  style={{ marginRight: " 2%", color: "red" }}
                  className={`far fa-heart`}
                ></span>
                <span
                  style={{ marginRight: " 2%", color: "#1b9ce3" }}
                  className={`fa fa-envelope-o`}
                ></span>
              </p>
              <button
                onClick={applyForJob}
                className={`${styleJob.btnJobApply}`}
              >
                <span
                  className={`fas fa-lock`}
                  style={{ marginRight: " 5px" }}
                ></span>
                Apply
              </button>
            </div>
            <div className={`${styleJob.description}`}>
              <h4 style={{ marginTop: " 1.5%" }}>About</h4>
              <p>
                {job.company != null ? job.company.company_description : ""}
                <br />
                <br />
                <strong>Job Description: </strong>
                <br />
                {job.job_description}
              </p>

              <div style={styleRequirementDev}>
                <p>
                  <strong>Requirements: </strong>
                </p>
                <ul>
                  {job.job_requirements &&
                    job.job_requirements.map((requirementObj, index) => (
                      <li key={index}>{requirementObj.requirement}</li>
                    ))}
                </ul>
              </div>
              <div style={styleQualificationDev}>
                <p>
                  <strong>Qualifications: </strong>
                </p>
                <ul>
                  {job.job_qualifications &&
                    job.job_qualifications.map((qualificationObj, index) => (
                      <li key={index}>{qualificationObj.qualification}</li>
                    ))}
                </ul>
              </div>
              <div style={styleDutiesDev}>
                <p>
                  <strong>Duties & Responsibilities: </strong>
                </p>
                <ul>
                  {job.job_duties &&
                    job.job_duties.map((dutyObj, index) => (
                      <li key={index}>{dutyObj.duty}</li>
                    ))}
                </ul>
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

export default ViewJob;
