import React from "react";
import FeaturedJob from "./FeaturedJobs";
import job from './JobFunction.module.css'

function Jobs(props){
    console.log(props)
    const {jobs} = props 
    const tempjobs = jobs.map(job => {
        return <FeaturedJob
                    key={job.id}
                    id={job.id}
                    remoteJob={job.remoteJob}
                    category={job.category}
                    jobTitle={job.jobTitle}
                    company={job.company}
                    jobType={job.jobType}
                    location={job.location}
                    salary={job.salary}
                    description={job.description}
                    datePosted={job.datePosted} />

    })

    return(
        <>
            <div className={`${job.container}`}>
                <h5>FEATURED JOBS</h5>
                <a href="#">View Listing</a>
            </div>
            {tempjobs}
        </>
    )
}

export default Jobs