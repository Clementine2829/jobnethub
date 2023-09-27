import React, { Component } from "react";
import Header from "../Header/Header";
import Searcher from "../Searcher/Searcher";
import Footer from "../Footer/Footer";
import container from './JobListing.module.css'
import Jobs from './JobsFunction'
import CreateIndexedBtns from "./BtnsNextPrev";
import jobs from './Jobs'

class JobListing extends Component{
    constructor(props){
        super(props)

        this.state = ({
            activePage: 1,
            pagesCounter: 0,
            jobsPerPage: 5
        })
        this.resetValues()
    }

    resetValues(){
        if(jobs.length > this.state.jobsPerPage){
            const remainder = jobs % this.state.jobsPerPage
            if (remainder === 0) {
                this.state.pagesCounter = jobs.length / this.state.jobsPerPage
            } else {
                const decimalValue = jobs.length / this.state.jobsPerPage;
                this.state.pagesCounter = Math.floor(decimalValue) + 1;
            }
        }
    }

    filterJobs(){
        const startIndex = 5;
        const numberOfItems = this.state.jobsPerPage;
        return jobs.slice(startIndex, startIndex + numberOfItems);
    }

    viewJob(jobId){
        const newUrl = '/home';
        window.location.href = newUrl
        
    }
    render(){
        return(
            <>
                <Header />
                <Searcher variant="JobListing"/>

                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10`}>
                        <div className={`${container.browseJobs}`}>
                            <div className={`${container.browseJobs}`}>
                                <h4 className={`${container.heading}`}>Browse for jobs: </h4>
                                <button className={`${container.btnFilter}`}>Default</button>
                                <button className={`${container.btnFilter}`}>Most recent</button>
                                <button className={`${container.btnFilter}`}>Most Viewed</button>
                                <button className={`${container.btnFilter}`}>Longest</button>
                            </div>
                            <div className={`${container.browseJobs}`}>
                                <div className={`${container.filters}`}>
                                    <div className={`${container.subFilter}`}>
                                        <p>
                                            <strong>Work type</strong>
                                            <span className={`fas fa-angle-down`}></span>
                                        </p>
                                        <div>
                                            <input type="checkbox" value="fulltime" /> 
                                            <span>Full time</span>
                                        </div>
                                        <div>
                                            <input type="checkbox" value="parttime" /> 
                                            <span>Part time</span>
                                        </div>
                                        <div>
                                            <input type="checkbox" value="remote" /> 
                                            <span>Remote work</span>
                                        </div>
                                    </div>
                                    <div className={`${container.subFilter}`}>
                                        <p>
                                            <strong>Date posted</strong>
                                            <span className={`fas fa-angle-down`}></span>
                                        </p>
                                        <select>
                                            <option value="any">Any</option>
                                            <option value="any">Today</option>
                                            <option value="any">Yesterday</option>
                                            <option value="any">Last 7 days</option>
                                            <option value="any">Last 14 days</option>
                                            <option value="any">All times</option>
                                        </select>
                                    </div>
                                    <div className={`${container.subFilter}`}>
                                        <p>
                                            <strong>Min salary (pm)</strong>
                                            <span className={`fas fa-angle-down`}></span>
                                        </p>
                                        <select>
                                            <option value="any">Market relted</option>
                                            <option value="any">5 000</option>
                                            <option value="any">10 000</option>
                                            <option value="any">15 000</option>
                                            <option value="any">20 000</option>
                                            <option value="any">25 000</option>
                                            <option value="any">30 000 +</option>
                                        </select>
                                    </div>
                                    <div className={`${container.subFilter}`}>
                                        <p>
                                            <strong>Contact type</strong>
                                            <span className={`fas fa-angle-down`}></span>
                                        </p>
                                        <div>
                                            <input type="radio" value="all" /> 
                                            <span>All</span>
                                        </div>
                                        <div>
                                            <input type="radio" value="permanent" /> 
                                            <span>Permanent</span>
                                        </div>
                                        <div>
                                            <input type="radio" value="partime" /> 
                                            <span>Part-time</span>
                                        </div>
                                        <div>
                                            <input type="radio" value="temporary" /> 
                                            <span>Temporary</span>
                                        </div>
                                        <div>
                                            <input type="radio" value="contract" /> 
                                            <span>Contract</span>
                                        </div>
                                        <div>
                                            <input type="radio" value="internship" /> 
                                            <span>Internship</span>
                                        </div>
                                        <div>
                                            <input type="radio" value="volunteer" /> 
                                            <span>Volunteer</span>
                                        </div>
                                    </div>	
                                    <div className={`${container.subFilter}`}>
                                        <p>
                                            <strong>Location</strong>
                                            <span className={`fas fa-angle-down`}></span>
                                        </p>
                                        <select>
                                            <option value="any">Johannesburg</option>
                                            <option value="any">Pretoria</option>
                                            <option value="any">Polokwane</option>
                                            <option value="any">Cape Town</option>
                                            <option value="any">Durban</option>
                                            <option value="any">My current city</option>
                                        </select>
                                    </div>
                                    <div className={`${container.subFilter}`}>
                                       <a className={`${container.clearLink}`} href="#">Clear </a> 
                                       <button className={`${container.applyFilters}`}>Apply filters</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`${container.browseJobs}`}>
                                <p>Showing {jobs.length} available jobs</p>
                                <Jobs jobs={this.filterJobs()} />
                                <CreateIndexedBtns 
                                    jobs={jobs.length} 
                                    activePage={this.state.activePage} 
                                    pagesCounter={this.state.pagesCounter} 
                                    // activePage="2" 
                                    // pagesCounter="4" 
                                />    
                            </div>				
                        </div>
                    </div>
                    <div className={`col-sm-1`}></div>
                </div>

                <Footer />
            </>
        )
    }

}

export default JobListing