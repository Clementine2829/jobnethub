import React from "react";
import jobs from './JobItem.module.css'
  
function CheckDescription(description){
    if(description.length > 200)
        return <>{description.slice(0, 200)}...</>
    else return <>{description}</>
}
  
function formatDateToMMDDYYYY(dateString) {
    const date = new Date(dateString);
    const mm = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const dd = date.getDate().toString().padStart(2, '0');
    const yyyy = date.getFullYear();
  
    return `${mm}/${dd}/${yyyy}`;
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
                <span className={`${jobs.companyLink}`}>{props.company.company_name}</span>
                <span className={`fa fa-map-marker`}></span>
                <span>{props.location}</span>
            </p>
            <p>{CheckDescription(props.description)}</p>
            <p className={`${jobs.datePosted}`}>
                <span>Date posted: {formatDateToMMDDYYYY(props.datePosted)}</span>
                <span className={`far fa-heart`}></span>
                <span className={`fa fa-envelope-o`}></span>
            </p>
        </div>
    )
}

export default JobItem;