import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import jobCSS from "./PostJob.module.css";
import "./PostJob.css";
import ListItem from "./ListItem";
import DataFetcher, { getJobById, updateJob } from "../Server/Jobs";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../ReduxStateManagement/tokenService";
import { getCompanies } from "../Server/Companies";

const PostJob = () => {
  const [job, setJob] = useState({
    job_id: "",
    job_title: "",
    job_description: "",
    remote_work: false,
    job_type: "",
    work_type: "",
    job_salary_min: "",
    job_salary_max: "",
    category: {
      category_id: "",
      category_name: "",
    },
    job_location: "",
    closing_date: "",
    newItemValue: "",
    jobRequrementsItems: { requirement: "" },
    jobQualificationsItems: { qualification: "" },
    jobDutiesItems: { duty: "" },
  });
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [dataFetched, setDataFetched] = useState(false);
  const [todayDate] = useState(new Date().toISOString().slice(0, 10));
  const [limitList] = useState(4);
  // const [accessToken, setAccessToken] = useState(getAccessToken());
  // const dispatch = useDispatch();
  // const { accessToken, refreshToken } = useSelector((state) => state.auth);
  // console.log("true accessToken ", accessToken);

  const [requirementsItems, setRequrementsItems] = useState([]);
  const [qualificationsItems, setQualificationsItems] = useState([]);
  const [dutiesItems, setDutiesItems] = useState([]);
  const [newItemValue, setNewItemValue] = useState("");

  const { accessToken } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    const fullURL = window.location.href;
    const fullURLArray = fullURL.split("/");
    const job_id = fullURLArray[fullURLArray.length - 1];

    const fetchJob = async () => {
      try {
        if (job_id !== "update" || job_id !== "") {
          const fetchedJob = await getJobById(job_id, accessToken, true);
          setJob((prevJob) => ({
            ...prevJob,
            job_id: fetchedJob.job_id,
            job_title: fetchedJob.job_title,
            job_ref: fetchedJob.job_ref,
            job_description: fetchedJob.job_description,
            remote_work: fetchedJob.remote_work,
            job_type: fetchedJob.job_type,
            work_type: fetchedJob.work_type,
            job_salary_min: fetchedJob.job_salary_min,
            job_salary_max: fetchedJob.job_salary_max,
            job_location: fetchedJob.job_location,
            closing_date: fetchedJob.closing_date,
            company: JSON.parse(fetchedJob.company),
            category: JSON.parse(fetchedJob.category),
            jobRequrementsItems: fetchedJob.job_requirements[0] || {
              requirement: "",
            },
            jobQualificationsItems: fetchedJob.job_qualifications[0] || {
              qualification: "",
            },
            jobDutiesItems: fetchedJob.job_duties[0] || { duty: "" },
          }));

          updateRequirementsFromServer(fetchedJob.job_requirements);
          updateQualificationsFromServer(fetchedJob.job_qualifications);
          updateDutiesFromServer(fetchedJob.job_duties);
          setDataFetched(true);
          console.log("fetchedJob", fetchedJob);
        }
        const fetchedCompanies = await getCompanies(accessToken);
        setCompanies(fetchedCompanies);
        // if (fetchedCompanies.length > 0) {
        //   setSelectedValue(data[0].value);
        // }

        const foundItem = companies.find(
          (company) => company.company_id === job.company.company_id
        );

        // If found, set it as the initial selected value
        // if (foundItem) {
        setSelectedCompany(job.company.company_id);
        // }
      } catch (error) {
        console.log(error);
      }
    };

    if (!dataFetched && accessToken !== null) {
      fetchJob();
    }
  }, [accessToken]);

  // useEffect(() => {
  //   // console.log("Updated requirementsItems:", requirementsItems);
  // }, [requirementsItems]); // Log the state whenever requirementsItems changes

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value, type, checked } = event.target;

    if (type === "radio" || type === "checkbox") {
      // Handle radio and checkbox inputs
      setJob((prevJob) => ({
        ...prevJob,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else if (type === "select-one") {
      // Handle select element with a single option
      setJob((prevJob) => ({ ...prevJob, [name]: value }));
    } else {
      // Handle other input types (text, email, password, textarea, etc.)
      setJob((prevJob) => ({ ...prevJob, [name]: value }));
    }
  };

  const updateRequirementsFromServer = (job) => {
    const jobRequirements = job || [];
    const requirements = jobRequirements.slice(1).map((requirement, index) => ({
      text: requirement.requirement || "",
      placeholder: `Add requirement ${index + 2}`,
    }));
    setRequrementsItems(requirements);
  };

  const updateQualificationsFromServer = (job) => {
    const jobQualifications = job || [];
    const qualifications = jobQualifications
      .slice(1)
      .map((qualification, index) => ({
        text: qualification.qualification || "",
        placeholder: `Add qualification ${index + 2}`,
      }));
    setQualificationsItems(qualifications);
  };
  const updateDutiesFromServer = (job) => {
    const jobDuties = job || [];
    const duties = jobDuties.slice(1).map((duty, index) => ({
      text: duty.duty || "",
      placeholder: `Add duty ${index + 2}`,
    }));
    setDutiesItems(duties);
  };

  const handleAddRequirements = (event) => {
    event.preventDefault();
    if (requirementsItems.length === limitList) {
      return;
    }
    setRequrementsItems((prevItems) => [
      ...prevItems,
      { text: "", placeholder: "Add requirement" },
    ]);
  };

  const handleAddQualifications = (event) => {
    event.preventDefault();
    if (qualificationsItems.length === limitList) {
      return;
    }
    setQualificationsItems((prevItems) => [
      ...prevItems,
      { text: "", placeholder: "Add Qualification " },
    ]);
  };

  const handleAddDuties = (event) => {
    event.preventDefault();
    if (dutiesItems.length === limitList) {
      return;
    }
    setDutiesItems((prevItems) => [
      ...prevItems,
      { text: "", placeholder: "Add duty/responsibility" },
    ]);
  };

  const handleRemoveRequrements = (index) => {
    setRequrementsItems((prevItems) =>
      handleAddAndRemoveItem(index, prevItems)
    );
  };
  const handleRemoveQualifications = (index) => {
    setQualificationsItems((prevItems) =>
      handleAddAndRemoveItem(index, prevItems)
    );
  };
  const handleRemoveDuty = (index) => {
    setDutiesItems((prevItems) => handleAddAndRemoveItem(index, prevItems));
  };
  const handleAddAndRemoveItem = (index, prevItems) => {
    const updatedItems = [...prevItems];
    updatedItems.splice(index, 1);
    return updatedItems;
  };

  const handleChangeRequirements = (index, updatedText) => {
    if (index === -1) {
      setJob((prevJob) => ({
        ...prevJob,
        jobRequrementsItems: { requirement: updatedText },
      }));
      return;
    }
    setRequrementsItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        text: updatedText,
      };
      return updatedItems;
    });
  };
  const handleChangeQualifications = (index, updatedText) => {
    if (index === -1) {
      setJob((prevJob) => ({
        ...prevJob,
        jobQualificationsItems: { qualification: updatedText },
      }));
      return;
    }
    setQualificationsItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        text: updatedText,
      };
      return updatedItems;
    });
  };
  const handleChangeDuties = (index, updatedText) => {
    if (index === -1) {
      console.log("updatedText", updatedText);
      setJob((prevJob) => ({
        ...prevJob,
        jobDutiesItems: { duty: updatedText },
      }));
      return;
    }
    setDutiesItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        text: updatedText,
      };
      return updatedItems;
    });
  };

  const displaJobref = () => {
    if (
      job.job_title === undefined ||
      job.job_id === "" ||
      job.job_id === "update"
    ) {
      return { display: "none" };
    } else {
      return {};
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("this is submitting again ");

    const requirements = requirementsItems.map((item) => {
      return { requirement: item.text };
    });
    const qualifications = qualificationsItems.map((item) => {
      return { qualification: item.text };
    });
    const duties = dutiesItems.map((item) => {
      return { duty: item.text };
    });

    requirements.splice(0, 0, job.jobRequrementsItems);
    qualifications.splice(0, 0, job.jobQualificationsItems);
    duties.splice(0, 0, job.jobDutiesItems);

    setJob((prevJob) => ({
      ...prevJob,
      job_requirements: requirements,
      job_qualifications: qualifications,
      job_duties: duties,
      company: selectedCompany,
    }));

    try {
      const response = await updateJob(job, job.job_id, accessToken);
      if (response.message == "successfully") {
        setSuccessMessage("Job updated successfully");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage("Job update failed");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Job update failed");
      console.log("error ", error);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 35000);

    return;
  };

  return (
    <>
      <Header />

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <h5>Manage job</h5>
          <p>Use this form below to manage and post new jobs</p>

          <p className={`err`}>{errorMessage}</p>
          <p className={`success`}>{successMessage}</p>
          <form onSubmit={handleSubmit}>
            <input type="hidden" value={job.job_id} />
            <div className={`${jobCSS.container}`}>
              <div className={`${jobCSS.form}`}>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor={`${jobCSS.job_title}`}>Job title</label>
                  <span className={`err`}> * </span>
                  <br />
                  <input
                    type="text"
                    name="job_title"
                    value={job.job_title}
                    onChange={handleInputChange}
                    className={`${jobCSS.job_title}`}
                    placeholder="Enter job title"
                  />
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="job_type">Select company</label>
                  <span className={`err`}> * </span>
                  <br />
                  <select
                    value={selectedCompany}
                    // onChange={handleSelectChange}
                    // value={job.job_type}
                    // name="job_type"
                    // onChange={handleInputChange}
                  >
                    <option value="">--Select--</option>
                    {companies.map((option) => (
                      <option
                        key={option.company_id}
                        value={option.company_name}
                      >
                        {option.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="remote_work"></label>
                  <input
                    type="checkbox"
                    name="remote_work"
                    checked={job.remote_work}
                    onChange={handleInputChange}
                  />
                  <span>Remote work</span>
                </div>
                <div style={displaJobref()} className={`${jobCSS.label}`}>
                  <label htmlFor="job_ref"></label>
                  <span>Job Ref: {job.job_ref}</span>
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="job_location">Location </label>
                  <span className={`err`}> * </span>
                  <br />
                  <input
                    type="text"
                    name="job_location"
                    value={job.job_location}
                    onChange={handleInputChange}
                    placeholder="E.g. Johannesburg"
                  />
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="job_type">Job type</label>
                  <span className={`err`}> * </span>
                  <br />
                  <select
                    value={job.job_type}
                    name="job_type"
                    onChange={handleInputChange}
                  >
                    <option value="">--Select--</option>
                    <option value="Internship">Internship</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="work_type">Work type</label>
                  <span className={`err`}> * </span>
                  <br />
                  <input
                    type="radio"
                    name="work_type"
                    value="Fulltime"
                    checked={job.job_type === "full time"}
                    onChange={handleInputChange}
                  />
                  <span>Full time</span>
                  <br />
                  <input
                    type="radio"
                    name="work_type"
                    value="parttime"
                    checked={job.job_type === "part time"}
                    onChange={handleInputChange}
                  />
                  <span>Part time</span>
                  <br />
                  <input
                    type="radio"
                    name="work_type"
                    value="remotework"
                    checked={job.job_type === "remotework"}
                    onChange={handleInputChange}
                  />
                  <span>Remote work</span>
                  <br />
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="salary">Salary</label>
                  <span className={`err`}></span>
                  <br />
                  <input
                    type="number"
                    name="job_salary_min"
                    value={job.job_salary_min}
                    // onChange={handleMinSalary}
                    onChange={handleInputChange}
                    className={`${jobCSS.salary}`}
                    placeholder="Minimum salary"
                  />
                  <span> - </span>
                  <input
                    type="number"
                    name="job_salary_max"
                    value={job.job_salary_max}
                    // onChange={handleMaxSalary}
                    onChange={handleInputChange}
                    className={`${jobCSS.salary}`}
                    placeholder="Maximum salary"
                  />
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="closing_date">Job Category</label>
                  <span className={`err`}> * </span>
                  <br />
                  <select
                    value={job.category.category_name}
                    name="category_name"
                    onChange={handleInputChange}
                  >
                    <option value="">--Select--</option>
                    <option value="2">Accounting</option>
                    <option value="3">Business</option>
                    <option value="4">Banking</option>
                    <option value="10">Finance</option>
                    <option value="11">General</option>
                    <option value="12">Health</option>
                    <option value="13">IT</option>
                    <option value="1">Other</option>
                    <option value="15">Retails</option>
                    <option value="16">Sales</option>
                    <option value="17">Security</option>
                  </select>
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="closing_date">Closing date</label>
                  <span className={`err`}> </span>
                  <br />
                  <input
                    type="date"
                    name="closing_date"
                    value={job.closing_date}
                    onChange={handleInputChange}
                    min={job.todayDate}
                  />
                </div>
                <div className={`${jobCSS.label}`}>
                  <label htmlFor="job_summary">Job summary</label>
                  <span className={`err`}> * </span>
                  <br />
                  <textarea
                    value={job.job_description}
                    name="job_description"
                    onChange={handleInputChange}
                    placeholder="Write a short summary about the job here..."
                  />
                </div>
                <div className={`last ${jobCSS.label}`}>
                  <label htmlFor="job_requirements">
                    <strong>Requirements</strong>
                  </label>
                  <br />
                  <small>
                    <strong>Note: </strong>Here you can state all the
                    requirements needed, skills and more
                  </small>
                  <ul>
                    <li>
                      <input
                        type="text"
                        placeholder="Add requirement"
                        value={job.jobRequrementsItems.requirement || ""}
                        onChange={(e) => {
                          handleChangeRequirements(-1, e.target.value);
                        }}
                      />
                      <button
                        className={`add_more`}
                        onClick={handleAddRequirements}
                      >
                        <span className="fas fa-plus"></span>
                      </button>
                    </li>
                    {requirementsItems.map((item, index) => {
                      return (
                        <ListItem
                          key={index}
                          index={index}
                          value={item}
                          onRemove={handleRemoveRequrements}
                          onChange={(e) =>
                            handleChangeRequirements(index, e.target.value)
                          }
                        />
                      );
                    })}
                  </ul>
                </div>
                <br />
                <div className={`last ${jobCSS.label}`}>
                  <label htmlFor="job_qualifications">
                    <strong>Qualifications</strong>
                  </label>
                  <br />
                  <small>
                    <strong>Note: </strong>Here you can state all the
                    qualifications and certificates that are needed
                  </small>
                  <ul>
                    <li>
                      <input
                        type="text"
                        placeholder="Add qualification"
                        value={job.jobQualificationsItems.qualification || ""}
                        onChange={(e) =>
                          handleChangeQualifications(-1, e.target.value)
                        }
                      />
                      <button
                        className={`add_more`}
                        onClick={handleAddQualifications}
                      >
                        <span className="fas fa-plus"></span>
                      </button>
                    </li>
                    {qualificationsItems.map((item, index) => (
                      <ListItem
                        key={index}
                        index={index + 2}
                        value={item}
                        onRemove={handleRemoveQualifications}
                        onChange={(e) =>
                          handleChangeQualifications(index, e.target.value)
                        }
                      />
                    ))}
                  </ul>
                </div>
                <br />
                <div className={`last ${jobCSS.label}`}>
                  <label htmlFor="job_duties">
                    <strong>Duties & Responsibilities</strong>{" "}
                  </label>
                  <br />
                  <small>
                    <strong>Note: </strong>
                    Here you can state all duties that an emplyee will be doing,
                    e.g. answer calls
                  </small>
                  <ul>
                    <li>
                      <input
                        type="text"
                        placeholder="Add duty/responsibility"
                        value={job.jobDutiesItems.duty || ""}
                        onChange={(e) => handleChangeDuties(-1, e.target.value)}
                      />
                      <button className={`add_more`} onClick={handleAddDuties}>
                        <span className="fas fa-plus"></span>
                      </button>
                    </li>
                    {dutiesItems.map((item, index) => (
                      <ListItem
                        key={index}
                        index={index + 2}
                        value={item}
                        onRemove={handleRemoveDuty}
                        onChange={(e) =>
                          handleChangeDuties(index, e.target.value)
                        }
                      />
                    ))}
                  </ul>
                </div>
                <div className={`${jobCSS.label}`}>
                  <p className={`err`}>{errorMessage}</p>
                  <p className={`success`}>{successMessage}</p>
                  <button className={`${jobCSS.submit_job_update}`}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={`col-sm-1`}></div>
      </div>
      <Footer />
    </>
  );
};

export default PostJob;
