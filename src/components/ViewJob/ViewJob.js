import React, {Component} from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import job from './ViewJob.module.css'
import JobsFunction from "./JobsFunction";
import DataFetcher, { getJobById } from "../Server/Jobs";

class ViewJob extends Component{
    constructor(props){
        super(props)

        // const job = props.match.params.job;
        // console.log(job)
        
        this.state = ({
            jobId: '488ac397f25165d172966e13936285245b5ed2b4c5b4',
            jobData: null,
            isLoading: false,
            companyJobs: [],
            relatedJobs: [],
        })
    }

    onCompanyJobFetched = (data) => {
        const parsedData = {
          ...data,
          company: JSON.parse(data.company),
          category: JSON.parse(data.category)
        };
        this.setState({
          relatedJob: parsedData,
        });
        this.filterJobs();        
    };

    filterJobs(){
        console.log(this.state.job)
        return this.state.job
    }
    
      
    onRelatedJobsFetched = (data) => {    
        const parsedData = data.map(item => ({
            ...item,
            company: JSON.parse(item.company),
            category: JSON.parse(item.category)
        }));
        this.setState({
            relatedJobs: parsedData,
        });
    };

    onCompanyJobsFetched = (data) => {    
        const parsedData = data.map(item => ({
            ...item,
            company: JSON.parse(item.company),
            category: JSON.parse(item.category)
        }));
        this.setState({
            relatedJobs: parsedData,
        });
    };

    render(){
        return(
            <>
                <Header />

                <DataFetcher fetchFunction={() => getJobById(this.state.jobId)} onDataFetched={this.onCompanyJobFetched} />

                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-3 ${job.otherJobContainer}`}>
                        <div className={`${job.container}`}>
                            <div className={`${job.subContainer}`}>
                                <div className={`${job.header}`} >
                                    <h4>Get notifications for jobs related to this</h4>
                                </div>
                                <div className={`${job.body}`}>
                                    <label for="email">Email address</label>
                                    <span> * </span>
                                    <input type="email" placeholder="Enter your email" />
                                    <button>
                                        <span className={`fas fa-bell`} style={{"margin-right":"5%"}}></span>
                                        Create a new job alert
                                    </button>
                                </div>
                            </div>
                            <div className={`${job.subContainer}`}>
                                <div className={`${job.jobs}`}>
                                    <h4>Jobs available in this company</h4>
                                    <div className={`${job.jobList}`}>
                                        {/* < JobsFunction jobs={jobs} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className={`${job.subContainer}`}>
                            <div className={`${job.jobs}`}>
                                    <h4>Related jobs</h4>
                                    <div className={`${job.jobList}`}>
                                        {/* < JobsFunction jobs={jobs.slice(4, 6)} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-7 ${job.mainJobContainerAtServer}`}>
                        <div className={`${job.jobContainer}`}>
                            <div className={`${job.imageContainer}`}>
                                {/* <img src={imgURL} alt={`Company logo`} style={{"height": "100%", "width": "auto"}} />                                 */}
                            </div>
                            <div className={`${job.description}`}>
                                <h4>
                                    {/* {job.state.job.jobTitle} */}
                                    {
                                        console.log("this.state.job")
                                    }
                                    <span className={`${job.remote}`}>Remote</span>    
                                </h4>
                                <p>
                                    <span className={`fas fa-building`} style={{"margin-right":" 5px"}}></span>                                
                                    <a href="#" style={{"text-decoration":"none"}}>African Bank</a>
                                </p>
                                <p>
                                    <span className={`fa fa-map-marker`} style={{"margin-right":" 5px"}}></span>
                                    Johannesburg
                                </p>
                                <p>
                                    Job Type: <span> Contract</span>
                                </p>
                                <p>
                                    Salary: <span>12 000 Per Month</span>
                                </p>
                                <p>
                                    Date posted: 15 Aug 2023 (Closing date: 12 Sep 2023, 25 days left)
                                </p>
                                <p>
                                    Reference: <span>PSU23301</span> 
                                </p>
                                <p className={`${job.share}`}>
                                    <span style={{"margin-right":" 2%", "color":"red"}} className={`far fa-heart`}></span>
                                    <span style={{"margin-right":" 2%", "color":"#1b9ce3"}}className={`fa fa-envelope-o`}></span>
                                </p>
                                <button className={`${job.btnJobApply}`}>
                                    <span className={`fas fa-lock`} style={{"margin-right":" 5px"}}></span>
                                    Apply
                                </button>
                            </div>
                            <div className={`${job.description}`}>
                                <h4 style={{"margin-top":" 1.5%"}}>About</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nulla viverra quam libero, ac egestas quam tempor non. 
                                    Morbi vel est arcu. Nunc commodo dolor ut iaculis venenatis. 
                                    Etiam a quam malesuada, mattis sem nec, mattis elit. 
                                    Integer pharetra venenatis turpis, quis mattis mauris tincidunt 
                                    fringilla. In id sem purus. 
                                    <br/><br/>
                                    Orci varius natoque penatibus et 
                                    magnis dis parturient montes, nascetur ridiculus mus. 
                                    Suspendisse ut viverra erat, dictum volutpat urna. 
                                    Fusce placerat metus in euismod finibus. Proin nunc justo, 
                                    vehicula ut lectus eget, aliquam condimentum orci. 
                                    Quisque porta ipsum id ultricies luctus.
                                </p>
                                <p>
                                    <strong>Requirements: </strong>
                                </p>
                                <ul>
                                    <li>Min of 5 years workin in Tech environe</li>
                                    <li>2 Years of Python developemet</li>
                                </ul>
                                <p>
                                    <strong>Qualifications: </strong>
                                </p>
                                <ul>
                                    <li>BSc in computer science/ IT/ computer system or any related qualification</li>
                                </ul>
                                <p>
                                    <strong>Duties & Responsibilities: </strong>
                                </p>
                                <ul>
                                    <li>Fix bugs</li>
                                    <li>Fix another bugs</li>
                                    <li>Forever fix bugs</li>
                                    <li>Introduce features</li>
                                </ul>
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

export default ViewJob