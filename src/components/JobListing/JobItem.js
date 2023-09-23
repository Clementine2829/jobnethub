import React from "react";
import jobs from './JobItem.module.css'
  
function CheckDescription(description){
    if(description.length > 200)
        return <>{description.slice(0, 200)}...</>
    else return <>{description}</>
}
function JobItem(props){  
    return(
        <div
            onClick={()=> window.location.href="./jobs/" + props.id}  
            className={`${jobs.jobContainer}`}>
            <input type="hidden" value={props.id} />
            <h3>{props.jobTitle} {props.remoteJob && <span className={`${jobs.remoteJob}`}>Remote</span>}</h3>
            <p className={`${jobs.company}`}>
                <span className={`fas fa-building`}></span>
                <span className={`${jobs.companyLink}`}>{props.company}</span>
                <span className={`fa fa-map-marker`}></span>
                <span>{props.location}</span>
            </p>
            <p>{CheckDescription(props.description)}</p>
            <p className={`${jobs.datePosted}`}>
                <span>Date posted: {props.datePosted}</span>
                <span className={`far fa-heart`}></span>
                <span className={`fa fa-envelope-o`}></span>
            </p>
        </div>
    )
}

export default JobItem;