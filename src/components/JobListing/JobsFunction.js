import React from "react";
import JobList from "./JobItem";

function Jobs(props){
    const {jobs} = props 
    const tempjobs = jobs.map(job => {
        return <JobList
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
        likes={job.likes}
        datePosted={job.date_updated} />
})

    return(<>{tempjobs}</>)
}

export default Jobs