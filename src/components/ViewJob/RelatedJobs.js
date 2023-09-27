import React, {Component} from "react";
import job from './RelatedJobs.module.css'

class RelatedJobs extends Component{

    render(){
        return(
            <>
                <div className={`${job.container}`}>
                    <a href="#">Data Manager</a>
                    <p>
                        <span className={`fas fa-marker`} style={{"margin-right": "2%"}}></span>
                        Johannesburg
                    </p>
                    {/* check first if date is available */}
                    <p>
                        <span className={`fas fa-calder`} style={{"margin-right": "2%"}}></span>
                        <span>10 days ago</span>
                    </p>
                </div>
            </>
        )
    }

}

export default RelatedJobs