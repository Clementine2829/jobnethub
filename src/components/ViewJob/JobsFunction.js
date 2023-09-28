import React from "react";
import RelatedJobs from "./RelatedJobs";

function Jobs(props){
    const {jobs} = props 
    const tempjobs = jobs.map(job => {
        return <RelatedJobs
                key={job.id}
                id={job.id}
                remoteJob={job.remoteJob}
                jobTitle={job.jobTitle}
                company={job.company}
                location={job.location}
                description={job.description}
                datePosted={job.datePosted} />

    })

    return(<>{tempjobs.slice(0, 3)}</>)
}

export default Jobs