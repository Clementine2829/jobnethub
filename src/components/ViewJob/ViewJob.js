import React, {Component} from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styleJob from './ViewJob.module.css'
import JobsFunction from "./JobsFunction";
import DataFetcher, { getJobById } from "../Server/Jobs";

class ViewJob extends Component{
    constructor(props){
        super(props)

        // const job = props.match.params.job;
        // console.log(job)

        // const path = window.location.pathname;
        // console.log('Path:', path);

        const fullURL = window.location.href;
        const fullURLArray = fullURL.split('/');
        const job_id = fullURLArray[fullURLArray.length - 1];
        this.state = {
            job: {job_id: job_id},
            isLoading: false,
            companyJobs: [],
            relatedJobs: [],
        }
    }

    onJobFetched = (data) => {
        alert("Job fetched")
        const job = {
          ...data,
          company: JSON.parse(data.company),
          category: JSON.parse(data.category)
        };
        this.returnJob(job)
    };

    returnJob = (job) => {
        // this.setState((prevState) => ({
        //     ...prevState,
        //     job: job,
        //     isLoading: false,
        // }));
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

    applyForJob = () => {
        alert("Applying for job " + this.state.job.job_id)
    }

    render(){
        const { job } = this.state;
        console.log("job")
        console.log(job)
        return(
            <>
                <Header />

                <DataFetcher fetchFunction={() => getJobById(job.job_id)} onDataFetched={this.onJobFetched} />
                {/* <DataFetcher fetchFunction={getJobs} onDataFetched={this.onDataFetched} /> */}

                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-3 ${styleJob.otherJobContainer}`}>
                        <div className={`${styleJob.container}`}>
                            <div className={`${styleJob.subContainer}`}>
                                <div className={`${styleJob.header}`} >
                                    <h4>Get notifications for jobs related to this</h4>
                                </div>
                                <div className={`${styleJob.body}`}>
                                    <label htmlFor="email">Email address</label>
                                    <span> * </span>
                                    <input type="email" placeholder="Enter your email" />
                                    <button>
                                        <span className={`fas fa-bell`} style={{"marginRight":"5%"}}></span>
                                        Create a new job alert
                                    </button>
                                </div>
                            </div>
                            <div className={`${styleJob.subContainer}`}>
                                <div className={`${styleJob.jobs}`}>
                                    <h4>Jobs available in this company</h4>
                                    <div className={`${styleJob.jobList}`}>
                                        {/* < JobsFunction jobs={jobs} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className={`${styleJob.subContainer}`}>
                            <div className={`${styleJob.jobs}`}>
                                    <h4>Related jobs</h4>
                                    <div className={`${styleJob.jobList}`}>
                                        {/* < JobsFunction jobs={jobs.slice(4, 6)} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-7 ${styleJob.mainJobContainerAtServer}`}>
                        <div className={`${styleJob.jobContainer}`}>
                            <div className={`${styleJob.imageContainer}`}>
                                {/* <img src={imgURL} alt={`Company logo`} style={{"height": "100%", "width": "auto"}} />                                 */}
                            </div>
                            <div className={`${styleJob.description}`}>
                                <h4>
                                    {job.job_title}
                                    <span className={`${styleJob.remote}`}>{job.remote_work? "Remote":""}</span>    
                                </h4>
                                <p>
                                    <span className={`fas fa-building`} style={{"marginRight":" 5px"}}></span>                                
                                    {/* <a href="#" style={{"textDecoration":"none"}}>{job.company.company_name}</a> */}
                                </p>
                                <p>
                                    <span className={`fa fa-map-marker`} style={{"marginRight":" 5px"}}></span>
                                    {job.job_location}
                                </p>
                                <p>
                                    Job Type: <span> {job.job_type}</span>
                                </p>
                                <p>
                                    Salary: <span>{job.job_salary}</span>
                                </p>
                                <p>
                                    Date posted: {job.date_updated} 
                                    {/* 15 Aug 2023 (Closing date: 12 Sep 2023, 25 days left) */}
                                </p>
                                <p>
                                    Reference: <span>{job.job_ref}</span> 
                                </p>
                                <p className={`${styleJob.share}`}>
                                    <span style={{"marginRight":" 2%", "color":"red"}} className={`far fa-heart`}></span>
                                    <span style={{"marginRight":" 2%", "color":"#1b9ce3"}}className={`fa fa-envelope-o`}></span>
                                </p>
                                <button onClick={this.applyForJob} className={`${styleJob.btnJobApply}`}>
                                    <span className={`fas fa-lock`} style={{"marginRight":" 5px"}}></span>
                                    Apply
                                </button>
                            </div>
                            <div className={`${styleJob.description}`}>
                                <h4 style={{"marginTop":" 1.5%"}}>About</h4>
                                <p>
                                    {/* {job.company.about_company}  */}
                                    {/* {job.company.about_company != null ? "<br/><br/>": ""} */}
                                    {job.job_description}
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