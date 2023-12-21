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

  const onDataFetched = (data) => {
    console.log("data", data);
    if (dataFetched) return;

    const parsedData = data.jobs.map((item) => ({
      ...item,
      company: JSON.parse(item.company) || {},
      category: JSON.parse(item.category) || {},
    }));

    setJobs(parsedData);
    setDataFetched(true);
  };

  useEffect(() => {
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
        <Searcher variant="Home" />
      </div>

      <div>
        <p className={`${home.createResume}`}>
          <strong>
            Need a professional CV? click <a href="#">here</a> to create your CV
          </strong>
        </p>
      </div>
      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <div>{/* <pre>{JSON.stringify(jobs, null, 2)}</pre> */}</div>
          <JobFunctions jobs={jobs} />
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
