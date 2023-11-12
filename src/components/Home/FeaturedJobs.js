import React from "react";
import job from './FeaturedJobs.module.css'

function FeaturedJob (props) {
    let styleThisSpan = {}
    if(props.job_type == null || props.job_type == ""){
        styleThisSpan = {
            "display":"none"
        }
    }
    console.log(props)
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
                <span> {props.jobSalary && " | " + props.jobSalary}</span>
            </p>
            <button>Apply for Job</button>
        </div>
    )
}

export default FeaturedJob
