import React from "react";
import FeaturedJob from "./FeaturedJobs";
import job from "./JobFunction.module.css";

function Jobs(props) {
  const { jobs } = props;
  const featuredJobs = jobs.map((job) => {
    return (
      <FeaturedJob
        key={job.job_id}
        id={job.job_id}
        remoteJob={job.remote_work}
        category={job.category}
        jobTitle={job.job_title}
        company={job.company}
        jobType={job.job_type}
        location={job.job_location}
        salary={job.job_salary}
        description={job.job_description}
        datePosted={job.date_updated}
      />
    );
  });

  return (
    <>
      <div className={`${job.container}`}>
        <h5>FEATURED JOBS</h5>
        <a href="./jobs">View Listing</a>
      </div>
      {featuredJobs}
    </>
  );
}

export default Jobs;
