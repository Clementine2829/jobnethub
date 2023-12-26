import React, { useState, useEffect } from "react";
import listing from "./Searcher.module.css";
import "./SearcherGlobal.css";
import { appBaseURL } from "../Server/apiConstants";

const Searcher = (props) => {
  const { _search, _location, currentPage } = props;

  const [isDivHidden, setIsDivHidden] = useState(true);
  const [smallScreen, setSmallScreen] = useState(599);
  const [search, setSearch] = useState(_search || "");
  const [location, setLocation] = useState(_location || "");
  const [errorMessageSearch, setErrorMessageSearch] = useState("");
  const [pattern, setPattern] = useState(/^[a-zA-Z0-9.,_-\s]*$/);
  // const [currentURLPage, setCurrentURLPage] = useState("");
  const [containerStyles, setContainerStyles] = useState({});
  const [displayForSmallScreen, setDisplayForSmallScreen] = useState({});
  const [styleDevs, setStyleDevs] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [style1, setStyle1] = useState(
    currentPage === "Home" || windowSize.width > smallScreen
      ? "inline-block"
      : "none"
  );

  useEffect(() => {
    setStyle1(
      currentPage === "Home" || windowSize.width > smallScreen
        ? "inline-block"
        : "none"
    );

    if (currentPage === "Home") {
      setStyleDevs({
        backgroundColor: "white",
        border: "none",
      });
      setContainerStyles({ display: style1, marginTop: "5%", color: "white" });
    } else {
      setContainerStyles({ display: style1 });
      setStyleDevs({
        backgroundColor: "white",
        border: "1px solid #1b9ce3",
      });
    }
    const style2 =
      currentPage !== "Home" && windowSize.width <= smallScreen
        ? "inline-block"
        : "none";
    setDisplayForSmallScreen({ display: style2 });
  }, []);

  const filterSearch = () => {
    if (windowSize.width < smallScreen) {
      if (containerStyles.display === "inline-block") {
        setContainerStyles({ display: "none" });
      } else {
        setContainerStyles({ display: "inline-block" });
      }
    }
  };

  const handleJob = (event) => {
    event.preventDefault();
    const text = event.target.value;
    setErrorMessageSearch("");
    if (text.match(pattern)) setSearch(text.match(pattern));
    else {
      setErrorMessageSearch("Invalid use of special chars");
    }
  };

  const handleLocation = (event) => {
    event.preventDefault();
    const text = event.target.value;
    setErrorMessageSearch("");
    if (text.match(pattern)) setLocation(text.match(pattern));
    else {
      setErrorMessageSearch("Invalid use of special chars");
    }
  };

  const submitSearchForm = (event) => {
    event.preventDefault();
    // if (
    //   (!search.input && !location.input) ||
    //   search.input.match(pattern) ||
    //   location.input.match(pattern)
    // ) {
    setErrorMessageSearch("");
    window.location.href = `${appBaseURL}jobs?q=${search}&location=${location}`;
    //   return;
    // }
    // setErrorMessageSearch("Enter keywords to search");
  };

  return (
    <>
      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10`}>
          <div
            style={containerStyles}
            className={`${listing.listingContainer}`}
          >
            <div className={`${listing.subContainer}`}>
              <h4>Your new job is waiting for you</h4>
              <p>Thousands of job opportunities available in South Africa</p>
              <span style={{ color: "red" }}>{errorMessageSearch}</span>
            </div>
            <div className={`${listing.subContainer}`}>
              <div style={styleDevs} className={`${listing.subForm}`}>
                <span className={`fas fa-search`}></span>
                <input
                  type="text"
                  value={search}
                  className={`${listing.jobTitle}`}
                  onChange={handleJob}
                  placeholder="Job title, Skills or Company"
                />
              </div>
              <div style={styleDevs} className={`${listing.subForm}`}>
                <span className={`fas fa-map-marker-alt`}></span>
                <input
                  type="text"
                  value={location}
                  // className={`${listing.jobLocation}`}
                  onChange={handleLocation}
                  placeholder="Location"
                />
              </div>
              <div className={`subForm ${listing.subForm}`}>
                <button
                  onClick={submitSearchForm}
                  className={`fas fa-search ${listing.search}`}
                >
                  Find job
                </button>
              </div>
              <div className={`subForm ${listing.subForm}`}>
                <span className={`err ${listing.errorMessageSearch}`}></span>
                <span className={`${listing.jobType}`}>
                  <input type="checkbox" value="remote" defaultChecked />
                  <span> Include remote jobs </span>
                </span>
                <span className={`${listing.jobType}`}>
                  <input type="checkbox" value="parttime" defaultChecked />
                  <span> Part-time jobs </span>
                </span>
                <span className={`${listing.jobType}`}>
                  <input type="checkbox" value="fulltime" defaultChecked />
                  <span> Full-time jobs </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>

      <div
        className={`${listing.displayForSmallScreen}`}
        style={displayForSmallScreen}
      >
        <button className={`${listing.openFilterBtn}`}>
          <span className={`fas fa-filter`}></span>
          <span> Filter </span>
        </button>
        <button className={`${listing.openSearchBtn}`} onClick={filterSearch}>
          <span className={`fas fa-search`}></span>
        </button>
        <select className={`${listing.sortBy}`}>
          <option value="relevance">Relevance</option>
          <option value="date">Date Posted</option>
          <option value="company">Company</option>
          <option value="location">Location</option>
          <option value="salary">Salary</option>
        </select>
      </div>
    </>
  );
};

export default Searcher;
