import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Searcher from "../Searcher/Searcher";
import Footer from "../Footer/Footer";
import container from "./JobListing.module.css";
import "./jobListingStyles.css";
import Jobs from "./JobsFunction";
import CreateIndexedBtns from "./BtnsNextPrev";
import { getJobs } from "../Server/Jobs";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsFetched, setJobsFetched] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pagesCounter, setPagesCounter] = useState(0);
  const [jobsPerPage] = useState(5);

  useEffect(() => {
    // const fetchJob = async () => {
    // const data = await getJobs("listing", activePage);
    getJobs("listing", activePage).then((data) => {
      try {
        const _totalJobs = data.totalJobs;

        const parsedJobs = data.jobs.map((item) => ({
          ...item,
          company: JSON.parse(item.company),
          category: JSON.parse(item.category),
        }));

        let counter = 0;
        let tempJobsPerPage = jobsPerPage;
        let buttons = 0;

        for (let i = 0; i < _totalJobs; i++) {
          if (counter === tempJobsPerPage - 1) {
            counter = 0;
            buttons++;
          } else {
            counter++;
          }
        }

        buttons =
          jobs.length === 0
            ? 0
            : _totalJobs % tempJobsPerPage === 0
            ? buttons
            : buttons + 1;
        setJobs(parsedJobs);
        setTotalJobs(_totalJobs);
        setPagesCounter(buttons);
      } catch (error) {
        // console.error("Error fetching data:");
      }
    });
  }, [activePage]);

  const filterJobs = () => {
    return jobs;
  };

  const jobsCounter = () => {
    if (jobs.length == 0) return 0;
    const startIndex = (activePage - 1) * jobsPerPage;
    return `${startIndex + 1} - ${
      startIndex + jobsPerPage
    } of ${totalJobs} jobs`;
  };

  const nextOrPrevPage = (newPage) => {
    setActivePage(newPage);
    window.location.href = "#";
  };

  return (
    <>
      <Header />
      <Searcher
        search={search}
        location={location}
        currentPage="JobListing"
        device="mobile"
      />

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <div className={`${container.browseJobs}`}>
            <div
              className={`${container.browseJobs}`}
              style={{ display: "none" }}
            >
              <h4 className={`${container.heading}`}>Browse for jobs: </h4>
              <button className={`${container.btnFilter}`}>Relevant</button>
              <button className={`${container.btnFilter}`}>Most recent</button>
              <button className={`${container.btnFilter}`}>Most Viewed</button>
              <button className={`${container.btnFilter}`}>Longest</button>
            </div>

            <div className={`${container.browseJobs}`}>
              <div className={`${container.filters}`}>
                <div className={`${container.subFilter}`}>
                  <p>
                    <strong>Work type</strong>
                    <span className={`fas fa-angle-down`}></span>
                  </p>
                  <div>
                    <input type="checkbox" value="fulltime" />
                    <span>Full time</span>
                  </div>
                  <div>
                    <input type="checkbox" value="parttime" />
                    <span>Part time</span>
                  </div>
                  <div>
                    <input type="checkbox" value="remote" />
                    <span>Remote work</span>
                  </div>
                </div>
                <div className={`${container.subFilter}`}>
                  <p>
                    <strong>Date posted</strong>
                    <span className={`fas fa-angle-down`}></span>
                  </p>
                  <select>
                    <option value="any">All times</option>
                    <option value="any">Today</option>
                    <option value="any">Yesterday</option>
                    <option value="any">Last 7 days</option>
                    <option value="any">Last 14 days</option>
                  </select>
                </div>
                <div className={`${container.subFilter}`}>
                  <p>
                    <strong>Category</strong>
                    <span className={`fas fa-angle-down`}></span>
                  </p>
                  <select>
                    <option value="any">All Categories</option>
                    <option value="any">IT</option>
                    <option value="any">Media</option>
                    <option value="any">Finance</option>
                    <option value="any">Sales</option>
                    <option value="any">Engineering</option>
                    <option value="any">Accounting</option>
                    <option value="any">Insurance</option>
                    <option value="any">Admin</option>
                  </select>
                </div>
                <div className={`${container.subFilter}`}>
                  <p>
                    <strong>Min salary (pm)</strong>
                    <span className={`fas fa-angle-down`}></span>
                  </p>
                  <select>
                    <option value="any">Market relted</option>
                    <option value="any">5 000</option>
                    <option value="any">10 000</option>
                    <option value="any">15 000</option>
                    <option value="any">20 000</option>
                    <option value="any">25 000</option>
                    <option value="any">30 000 +</option>
                  </select>
                </div>
                <div className={`${container.subFilter}`}>
                  <p>
                    <strong>Contact type</strong>
                    <span className={`fas fa-angle-down`}></span>
                  </p>
                  <div>
                    <input type="radio" value="all" />
                    <span>All</span>
                  </div>
                  <div>
                    <input type="radio" value="permanent" />
                    <span>Permanent</span>
                  </div>
                  <div>
                    <input type="radio" value="partime" />
                    <span>Part-time</span>
                  </div>
                  <div>
                    <input type="radio" value="temporary" />
                    <span>Temporary</span>
                  </div>
                  <div>
                    <input type="radio" value="contract" />
                    <span>Contract</span>
                  </div>
                  <div>
                    <input type="radio" value="internship" />
                    <span>Internship</span>
                  </div>
                  <div>
                    <input type="radio" value="volunteer" />
                    <span>Volunteer</span>
                  </div>
                </div>
                <div className={`${container.subFilter}`}>
                  <p>
                    <strong>Location</strong>
                    <span className={`fas fa-angle-down`}></span>
                  </p>
                  <select>
                    <option value="any">Johannesburg</option>
                    <option value="any">Pretoria</option>
                    <option value="any">Polokwane</option>
                    <option value="any">Cape Town</option>
                    <option value="any">Durban</option>
                    <option value="any">My current city</option>
                  </select>
                </div>
                <div className={`${container.subFilter}`}>
                  <a className={`${container.clearLink}`} href="#">
                    Clear{" "}
                  </a>
                  <button className={`${container.applyFilters}`}>
                    Apply filters
                  </button>
                </div>
              </div>
            </div>
            <div className={`${container.browseJobs}`}>
              {jobsCounter() === 0 ? (
                <div style={{ textAlign: "center", color: "red" }}>
                  <br />
                  <br />
                  <p>Showing 0 jobs </p>
                  <p>Please check back later...</p>
                  <br />
                  <br />
                </div>
              ) : (
                <p>
                  <span>Showing {jobsCounter()} </span>
                  <span className={`${container.sortBy}`}>
                    Sort: {`\t`}
                    <select>
                      <option value="relevance">Relevance</option>
                      <option value="date">Date Posted</option>
                      <option value="company">Company</option>
                      <option value="location">Location</option>
                      <option value="salary">Salary</option>
                    </select>
                  </span>
                </p>
              )}
              <Jobs jobs={filterJobs()} />
              <CreateIndexedBtns
                // key={Math.floor(Math.random() * 10000)}
                // activePage={activePage}
                // pagesCounter={pagesCounter}
                // nextOrPrevPage={nextOrPrevPage}
                key={Math.floor(Math.random() * 10000)}
                jobs={jobs.length}
                activePage={activePage}
                pagesCounter={pagesCounter}
                jobsPerPage={jobsPerPage}
                nextOrPrevPage={nextOrPrevPage}
              />
            </div>
          </div>
        </div>
        <div className={`col-sm-1`}></div>
      </div>

      <Footer />
    </>
  );
};

export default JobListing;
