import React, { useEffect, useState } from "react";
import job from './RelatedJobs.module.css'

function RelatedJobs(props){ 
    
    const getRelativeDate = (externalDate) => {
        const currentDate = new Date();
        const formattedDateTime = currentDate.toLocaleString();

        const timeDifference = formattedDateTime - externalDate;
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference === 0) {
            return 'Posted today';
        } else if (daysDifference === 1) {
            return 'Posted yesterday';
        } else if (daysDifference >= 2 && daysDifference <= 7) {
            return 'Posted a week ago';
        } else if (daysDifference > 7 && daysDifference <= 30) {
            return 'Posted a month ago';
        } else {
            return externalDate;
        }
    }

    const [datePosted, setDatePosted] = useState(new Date());
    
    // if(props.datePosted != ""){
    //     props.datePosted = getRelativeDate(props.datePosted);
    // }
    const transformedDate = props.datePosted !== "" ? getRelativeDate(props.datePosted) : "";
    
    return (
        <div className={`${job.container}`}>
            <a href={`./`+ props.id}>{props.jobTitle}</a>
            {/* <span> - {props.jobType}</span><br /> */}
            <p>
                <span className={`fa fa-map-marker`} style={{"margin-right": "2%"}}></span>
                {props.location}
            </p>
            {
                transformedDate &&
                <p>
                    <span className={`fas fa-calendar-alt`} style={{"margin-right": "2%"}}></span>
                    <span>{transformedDate}</span>
                </p>
            }
        </div>
    )

}

export default RelatedJobs