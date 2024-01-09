import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styleJob from "./ViewJob.module.css";
import { applyForAJob, getJobById, getRelatedJobs } from "../Server/Jobs";
import RelatedJobs from "./RelatedJobs";
import { useSelector } from "react-redux";

const ViewJob = () => {
  const { job: jobId } = useParams();
  const [job, setJob] = useState({ job_id: jobId });
  const [jobDataFetched, setJobDataFetched] = useState(false);
  const [relatedJobsDataFetched, setRelatedJobsDataFetched] = useState(false);
  const [companyDataJobsDataFetched, setCompanyDataJobsDataFetched] =
    useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [applicationMessage, setApplicationMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    subject: "",
    fromEmail: "",
    phone: "",
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [cvFile, setCvFile] = useState(null);

  const [styleApplicationMessage, setStyleApplicationMessage] = useState({
    color: "black",
  });
  const [styleRequirementDev, setStyleRequirementDev] = useState({
    display: "none",
  });
  const [styleQualificationDev, setStyleQualificationDev] = useState({
    display: "none",
  });
  const [styleDutiesDev, setStyleDutiesDev] = useState({ display: "none" });

  const { accessToken, firstname, lastname, email } = useSelector((state) => {
    return state.auth;
  });

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
        if (firstname != null && lastname != null && email != null) {
          setFormValues((prevValues) => ({
            ...prevValues,
            subject: `Application for ${jobData.job_title}`,
            name: `${firstname} ${lastname}`,
            fromEmail: email,
          }));
        }
      } catch (error) {
        // console.error("Error fetching job data:", error);
      }
    };

    if (!jobDataFetched) {
      fetchJob();
    }
  }, [
    job.job_id,
    jobDataFetched,
    relatedJobsDataFetched,
    companyDataJobsDataFetched,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSendClick = (event) => {
    event.preventDefault();
    const { name, subject, email, phone, body } = formValues;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\n${body}`)}`;

    window.location.href = mailtoLink;

    setShowModal(false);
  };

  const applyForJob = async (event) => {
    event.preventDefault();

    console.log("Skills Data:", skills);
    console.log("CV File:", cvFile);

    // Create FormData object to send as multipart/form-data
    const formData = new FormData();

    const toEmail = job.email;
    const body = `Dear hiring manager,\n\nI hope this email finds you well. My name is ${
      formValues.name
    }, and I am writing to express my strong interest in the ${
      job.job_title
    } position ${
      job.company != null ? "at " + job.company.company_name : ""
    }.\n\nI am confident about this job because it aligns with my skills and experiences that I have aquired throught my career which make me a strong candidate for this role. With the following key strengths/skills that I believe make me an excellent fit for the ${
      job.job_title
    } job post:\n${
      skills.length > 0 ? skills.map((skill, index) => `- ${skill}\n`) : ""
    }\nThank you for considering my application. I look forward to the opportunity to discuss how my skills, qualifications, and expertise align with the needs of your organization.\n\nBest regards,\n${
      formValues.name
    }\n${formValues.fromEmail}\n${formValues.phone}`;

    formData.append("formValues", JSON.stringify(formValues));
    formData.append("toEmail", JSON.stringify(toEmail));
    formData.append("body", JSON.stringify(body));
    if (cvFile !== null) {
      formData.append("cvFile", cvFile);
      formData.append("fileName", cvFile.name);
    }

    try {
      const { response } = await applyForAJob(formData, jobId, accessToken);
      if (response.status === "success") {
        setApplicationMessage(response.status);
        setStyleApplicationMessage({ color: "blue" });
        setCvFile(null);
      } else {
        setApplicationMessage("Job applications failed. " + response);
        setStyleApplicationMessage({ color: "red" });
      }
      console.log(response);
    } catch (error) {
      setApplicationMessage("Job applications failed.<br/>");
      setStyleApplicationMessage({ color: "red" });
      console.error("Error applying for job:", error);
    }
  };

  const toggleModal = () => {
    console.log("toggleModal");
    setShowModal(!showModal);
  };

  const handleSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && skills.length < 5) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleCvFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
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
  const salary = (min, max) => {
    return max !== "" ? `R${min} - R${max}` : `R${min}`;
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
    let daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if (daysLeft >= 0) {
      return `(Closing date: ${closingDateString}, ${daysLeft} day${
        daysLeft !== 1 ? "s" : ""
      } left)`;
    } else {
      daysLeft *= -1; // change to positive
      return `(Closed: ${closingDateString}, ${daysLeft} day${
        daysLeft !== 1 ? "s" : ""
      } ago)`;
    }
  };

  return (
    <>
      <Header />

      {!jobDataFetched ? (
        <div style={{ textAlign: "center", color: "red" }}>
          <br />
          <br />
          <p>Job not found. </p>
          <p>Please check back later...</p>
          <br />
          <br />
        </div>
      ) : (
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
            {/* <div className={`${styleJob.jobContainer}`}> */}
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
              <p>
                {job.job_type == "fulltime" ? `Job Type: ${job.job_type}` : ""}
              </p>
              {(job.job_salary_min || job.job_salary_max) && (
                <p>
                  Salary:{" "}
                  <span>{salary(job.job_salary_min, job.job_salary_max)}</span>
                </p>
              )}
              <p>
                Date posted: {datePosted(job.date_updated)}
                {job.closing_date != null
                  ? ` ${closingDate(job.closing_date, job.date_updated)}`
                  : ""}
              </p>
              <p>
                {/* Reference: <span>{job.job_ref}</span> */}
                Subject: <span> Application for {job.job_title}</span>
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
              {/* <p style={styleApplicationMessage}>{applicationMessage}</p> */}
              <p>
                {" "}
                <strong>
                  To apply, send E-mail to:{" "}
                  <span style={{ color: "blue " }}>{job.email}</span> or click
                  the button below to apply{" "}
                </strong>
              </p>
              <button
                onClick={toggleModal}
                className={`${styleJob.btnJobApply}`}
              >
                {/* <span
                  className={`fas fa-lock`}
                  style={{ marginRight: " 5px" }}
                ></span> */}
                Apply
              </button>
            </div>

            <div>
              {/* <button onClick={toggleModal}>Apply Now</button> */}

              {showModal && (
                <div>
                  {applicationMessage === "success" ? (
                    <div className={`${styleJob.message}`}>
                      <div
                        className={`${styleJob.modal} ${styleJob.modal_content} ${styleJob.message}`}
                      >
                        <span
                          className={`${styleJob.close}`}
                          onClick={toggleModal}
                        >
                          &times;
                        </span>
                        <p>
                          Email send successfully...
                          <br /> Please find copy in your provided email.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={`${styleJob.modal}`}>
                      <div
                        className={`${styleJob.modal} ${styleJob.modal_content}`}
                      >
                        <br />
                        <h3>
                          Use this form below to send your job application{" "}
                        </h3>
                        <span
                          className={`${styleJob.close}`}
                          onClick={toggleModal}
                        >
                          &times;
                        </span>
                        <div>
                          <label>Full Name:</label>
                          <br />
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formValues.name}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <label>Subject:</label>
                          <br />
                          <input
                            type="text"
                            name="subject"
                            placeholder="Enter email subject from the job "
                            value={formValues.subject}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label>Your Email address:</label>
                          <br />
                          <input
                            type="email"
                            name="fromEmail"
                            placeholder="Enter your valid email address "
                            value={formValues.fromEmail}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label>Your phone number:</label>
                          <br />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Enter you valid phone number "
                            value={formValues.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <small style={{ color: "red" }}>
                            Enter maximum of five (5) skills if needed.{" "}
                          </small>
                          <br />
                          <input
                            type="text"
                            value={newSkill}
                            placeholder={`Enter your skill number ${
                              skills.length + 1
                            } here`}
                            className={`${styleJob.addSkillInput}`}
                            onChange={handleSkillChange}
                          />
                          <button
                            className={`${styleJob.addSkills}`}
                            onClick={handleAddSkill}
                            disabled={skills.length >= 5}
                          >
                            Add Skill new
                          </button>
                          <ul>
                            {skills.map((skill, index) => (
                              <li key={index}>
                                <strong>{index + 1}.</strong> {skill}
                                <button
                                  className={`${styleJob.deleteSkillInput}`}
                                  onClick={() => handleDeleteSkill(index)}
                                >
                                  <span className="fas fa-trash-alt"></span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <label>Upload CV: </label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleCvFileChange}
                          />
                        </div>
                        <div>
                          <small>Below is an example of your email</small>
                          <p className={`${styleJob.mailBody}`}>
                            Dear hiring manager,
                            <br />
                            <br />I hope this email finds you well. My name is{" "}
                            {formValues.name}, and I am writing to express my
                            strong interest in the {job.job_title} position
                            {job.company != null
                              ? " at " + job.company.company_name
                              : ""}
                            .
                            {skills.length > 0 ? (
                              <span>
                                <br />
                                <br />I am confident about this job because it
                                aligns with my skills and experiences that I
                                have aquired throught my career which make me a
                                strong candidate for this role. With the
                                following key strengths/skills that I believe
                                make me an excellent fit for the {
                                  job.job_title
                                }{" "}
                                job post:
                                <br />
                                {skills.map((skill, index) => (
                                  <span>
                                    {" "}
                                    - {skill} <br />
                                  </span>
                                ))}
                              </span>
                            ) : (
                              <br />
                            )}
                            <br />
                            Thank you for considering my application. I look
                            forward to the opportunity to discuss how my skills,
                            qualifications, and expertise align with the needs
                            of your organization.
                            {cvFile != null && (
                              <span>
                                {" "}
                                Please find my resume attached for your
                                reference.
                              </span>
                            )}
                            <br />
                            <br />
                            Best regards,
                            <br />
                            {formValues.name}
                            <br />
                            {formValues.fromEmail}
                            <br />
                            {formValues.phone}
                          </p>
                        </div>
                        <button
                          className={`${styleJob.sendMail}`}
                          onClick={applyForJob}
                        >
                          Send
                        </button>
                        <button
                          className={`${styleJob.openWithOtherMain}`}
                          onClick={handleSendClick}
                        >
                          Open with Gmail/Yahoo/Outlook
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
            {/* </div> */}
          </div>
          <div className={`col-sm-1`}></div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ViewJob;
