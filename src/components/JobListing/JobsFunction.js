import React from "react";
import JobList from "./JobItem";

function Jobs(props){
    const {jobs} = props 
    const tempjobs = jobs.map(job => {
        return <JobList
            key={job.id}
            id={job.id}
            remoteJob={job.remoteJob}
            category={job.category}
            jobTitle={job.jobTitle}
            company={job.company}
            jobType={job.jobType}
            location={job.location}
            description={job.description}
            datePosted={job.datePosted} />

    })

    return(<>{tempjobs}</>)
}

export default Jobs