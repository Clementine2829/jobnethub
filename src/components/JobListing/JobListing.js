import React, { Component } from "react";
import Header from "../Header/Header";
import Searcher from "../Searcher/Searcher";
import Footer from "../Footer/Footer";
import container from './JobListing.module.css'
import "./jobListingStyles.css"
import Jobs from './JobsFunction'
import CreateIndexedBtns from "./BtnsNextPrev";
import DataFetcher, {getJobs} from "../Server/Jobs";
// import jobs from './Jobs'

class JobListing extends Component{
    constructor(props){
        super(props)

        this.state = ({
            jobs: [],
            activePage: 1,
            pagesCounter: 0,
            jobsPerPage: 5,
        })
        this.resetValues()
    }

    onDataFetched = (data) => {    
        const parsedJobs = data.map(item => ({
            ...item,
            company: JSON.parse(item.company),
            category: JSON.parse(item.category)
        }));
        let counter = 0;
        let tempJopsPerPage = this.state.jobsPerPage;
        let buttons = 0;
        for (let i = 0; i < parsedJobs.length; i++) {
            if (counter === tempJopsPerPage - 1) {
                counter = 0;
                buttons++;
            } else {
                counter++;
            }
        }
        buttons = (parsedJobs % tempJopsPerPage === 0) ? buttons : buttons + 1;
        this.setState({
            jobs: parsedJobs,
            activePage: 1,
            pagesCounter: buttons,
        });
        this.filterJobs()
    };

    filterJobs = () => {
        const startIndex = (this.state.activePage - 1) * this.state.jobsPerPage;
        const endIndex = startIndex + this.state.jobsPerPage;
        return this.state.jobs.slice(startIndex, endIndex);
    };
    jobsCounter = () => {
        const startIndex = (this.state.activePage - 1) * this.state.jobsPerPage;
        const endIndex = startIndex + this.state.jobsPerPage;
        const displayedJobs = this.state.jobs.slice(startIndex, endIndex);
        return `${startIndex + 1} - ${startIndex + displayedJobs.length} of ${this.state.jobs.length} jobs`;
    };
    
    nextOrPrevPage = (newPage) => {
        this.setState({
            activePage: newPage
        });
    }

    resetValues = () => {
        if(this.state.jobs.length > this.state.jobsPerPage){
            const remainder = this.state.jobs % this.state.jobsPerPage
            if (remainder === 0) {
                this.state.pagesCounter = this.state.jobs.length / this.state.jobsPerPage
            } else {
                const decimalValue = this.state.jobs.length / this.state.jobsPerPage;
                this.state.pagesCounter = Math.floor(decimalValue) + 1;
            }
        }
    }
    

    viewJob = (jobId) => {
        const newUrl = '/home';
        window.location.href = newUrl
        
    }
    render(){
        return(
            <>
                <Header />
                <Searcher variant="JobListing" device="mobile"/>

                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10`}>
                        <div className={`${container.browseJobs}`}>
                            <div className={`${container.browseJobs}`}>
                                <h4 className={`${container.heading}`}>Browse for jobs: </h4>
                                <button className={`${container.btnFilter}`}>Relevant</button>
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
                                            <option value="any">All times</option>
                                            <option value="any">Today</option>
                                            <option value="any">Yesterday</option>
                                            <option value="any">Last 7 days</option>
                                            <option value="any">Last 14 days</option>
                                        </select>
                                    </div>
                                    <div className={`${container.subFilter}`}>
                                        <p>
                                            <strong>Category</strong>
                                            <span className={`fas fa-angle-down`}></span>
                                        </p>
                                        <select>
                                            <option value="any">All Categories</option>
                                            <option value="any">IT</option>
                                            <option value="any">Media</option>
                                            <option value="any">Finance</option>
                                            <option value="any">Sales</option>
                                            <option value="any">Engineering</option>
                                            <option value="any">Accounting</option>
                                            <option value="any">Insurance</option>
                                            <option value="any">Admin</option>
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
                                <p>Showing {this.jobsCounter()} </p>
                                <Jobs jobs={this.filterJobs()} />
                                {/* <JobsFetcher onDataFetched={this.onDataFetched} /> */}
                                <DataFetcher fetchFunction={getJobs} onDataFetched={this.onDataFetched} />
                                <CreateIndexedBtns 
                                    key={ Math.floor(Math.random() * 10000)}
                                    jobs={this.state.jobs.length} 
                                    activePage={this.state.activePage} 
                                    pagesCounter={this.state.pagesCounter} 
                                    jobsPerPage={this.state.jobsPerPage} 
                                    nextOrPrevPage={this.nextOrPrevPage}
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