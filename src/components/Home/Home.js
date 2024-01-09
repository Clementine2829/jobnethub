import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Searcher from "../Searcher/Searcher";
import JobFunctions from "./JobFunction";
import home from "./Home.module.css";
import { getJobs } from "../Server/Jobs";
import "./searcher.css";
import JobByLocation from "./JobByLocation";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const onDataFetched = (data) => {
      try {
        if (dataFetched) return;
        const parsedData = data.jobs.map((item) => ({
          ...item,
          company: JSON.parse(item.company) || {},
          category: JSON.parse(item.category) || {},
        }));

        setJobs(parsedData);
        setDataFetched(true);
      } catch (error) {}
    };

    getJobs("home").then(onDataFetched);
    // Cleanup function if needed
    return () => {
      // Cleanup logic
    };
  }, []);

  return (
    <>
      <Header />

      <div className={`${home.backgroundContainer}`}>
        <Searcher currentPage="Home" />
      </div>

      <div style={{ display: "none" }}>
        <p className={`${home.createResume}`}>
          <strong>
            Need a professional CV? click <a href="./resume/update">here</a> to
            create your CV
          </strong>
        </p>
      </div>
      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <JobFunctions jobs={jobs} />
        </div>
        <div className={`col-sm-1`}></div>
      </div>

      <div className={`row`} style={{ display: "none" }}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <div className={`${home.browse_employees}`}>
            <h4>Are you looking for employees?</h4>
            <p>
              We have a database full of potential employees that would match
              your criteria. <br />
              <a href="./employees">
                Click to browse for potential employees you might like
              </a>
            </p>
          </div>
        </div>
        <div className={`col-sm-1`}></div>
      </div>

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <JobByLocation />
        </div>
        <div className={`col-sm-1`}></div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
