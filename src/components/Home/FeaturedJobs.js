import React from "react";
import job from './FeaturedJobs.module.css'


function FeaturedJob (props) {
    let styleThisSpan = {}
    if(props.job_type == null || props.job_type == ""){
        styleThisSpan = {
            "display":"none"
        }
    }
    const viewJob = (jobId) =>{
        window.location.href = `/jobs/${jobId}`
    }
    // let salary =  props.salary && " | R" + props.salary.split("-")[0] + " R" +  props.salary.split("-")[1]
    let salary =  props.salary && " | R" + props.salary
    return(
        <div className={`${job.container}`}>
            <input type="hidden" value={props.id} />
            <p className={`${job.line1}`}>
                <span style={styleThisSpan}>{props.jobType}</span>
                <span>{props.location}</span>
            </p>
            <div>
                {/* image here */}
                <h5>{props.jobTitle}</h5>
            </div>
            <p>
                <span>{props.category.category_name}</span>
                <span> {salary}</span>
            </p>
            <button onClick={() => viewJob(props.id)}>Apply for Job</button>
        </div>
    )
}

export default FeaturedJob
