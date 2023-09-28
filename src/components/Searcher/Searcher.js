import React, { Component } from "react";
import listing from './Searcher.module.css'

class Searcher extends Component{
    render(){
        const { variant } = this.props;

        let containerStyles = {};
        let devs = {};
        if (variant == "Home") {
            devs = {
                "backgroundColor": "white",
                "border": "none"
            };
            containerStyles = {
                "marginTop": "5%",
                "color": "white" 
            };
        } 

        return(
            <>
                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10`}>
                        <div style={containerStyles} className={`${listing.listingContainer}`}>
                            <div className={`${listing.subContainer}`}>
                                <h4>Your new job is waiting for you</h4>
                                <p>Thousands of job opportunities available in South Africa</p>
                            </div>
                            <div className={`${listing.subContainer}`}>
                                <div style={devs}  className={`${listing.subForm}`}>
                                    <span className={`fas fa-search`} ></span>
                                    <input type="text" className={`jobTitle`} placeholder="Job title, Skills or Company" />
                                </div>
                                <div style={devs} className={`${listing.subForm}`}>
                                    <span className={`fas fa-map-marker-alt`} ></span>
                                    <input type="text" className={`${listing.jobLocation}`} placeholder="Location" />
                                </div>
                                <div className={`subForm ${listing.subForm}`}>
                                    <button className={`${listing.search}`}> 
                                        <span className={`fas fa-search`}></span>
                                    </button>
                                </div>						
                                <div className={`subForm ${listing.subForm}`}>
                                    <span className={`err ${listing.errorMessageSearch}`}>

                                    </span>
                                    <span className={`${listing.jobType}`}>
                                        <input type="checkbox" value="remote" />
                                        <span> Include remote jobs </span>
                                    </span>
                                    <span className={`${listing.jobType}`}>
                                        <input type="checkbox" value="parttime" />
                                        <span> Part time jobs </span>
                                    </span>
                                    <span className={`${listing.jobType}`}>
                                        <input type="checkbox" value="fulltime" />
                                        <span> Full time jobs </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                </div>   
            </>
        )
    }
}

export default Searcher