import React, {Component} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import job from './PostJob.module.css'
import './PostJob.css'
import ListItem from './ListItem'

class PostJob extends Component{

    constructor(props){
        super(props)

        const { job } = props

        this.state = {
            companyId: job?.companyId || "",
            jobTitle: job?.jobTitle || "",
            jobDescription: job?.jobDescription || "",
            remoteWork: job?.remoteWork || false,
            jobType: job?.jobType || "",
            jobSalary: job?.jobSalary || 0,
            jobCategory: job?.jobCategory || "",
            jobLocation: job?.jobLocation || "",
            closingDate: job?.closingDate || "",

            items: [],
            newItemValue: ''
        }    
    }
    
    handleInputChange = (index, event) => {
        const { value } = event.target.value;
        this.setState((prevState) => {
            const updatedItems = [...prevState.items];
            updatedItems[index].text = value;
            return { items: updatedItems };
        });
    };
    
    // handleAddItem = () => {
    //     const { newItemValue, items } = this.state;
    //     if (newItemValue) {
    //         this.setState((prevState) => ({
    //             items: [...prevState.items, newItemValue],
    //             newItemValue: '',
    //         }));
    //     }
    // }
    handleAddItem = () => {
        this.setState((prevState) => ({
            items: [...prevState.items, { text: '', placeholder: 'Requirement '}],
        }));
    };

    handleRemoveItem = (value) => {
        this.setState({
            items: this.state.items.filter(item => item !== value),
        });
    }

    handleChangeItem = (value) => {
        this.setState({
            items: this.state.items.filter(item => item !== value),
        });
    }

    render(){
        const { items, newItemValue } = this.state;
        return(
            <>
                <Header />
                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10`}>
                        <h5>Manage job</h5>
                        <p>Use this form below to manage and post new jobs</p>
                        <div className={`${job.container}`} >
                            <div className={`${job.form}`}>
                                <div className={`${job.label}`}>
                                    <label for={`${job.job_title}`}>Job title</label>
                                    <span className={`err`}> * </span><br />
                                    <input type="text" className={`${job.job_title}`} placeholder="Enter job title" />
                                    <input type="hidden" value="" />
                                </div>
                                <div className={`${job.label}`}>
                                    <label for="remote_work" ></label>
                                    <input type="checkbox"/>
                                    <span>Remote work</span>
                                </div>
                                <div className={`${job.label}`}>
                                    <label for="job_location" >Location </label>
                                    <span className={`err`}> * </span><br />
                                    <input type="text" placeholder="E.g. Johannesburg" />
                                </div>
                                <div className={`${job.label}`}>
                                    <label for="job_type" >Job type</label>
                                    <span className={`err`}> * </span><br />
                                    <select>
                                        <option value="">--Select--</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Permanent">Permanent</option>
                                        <option value="Contract">Contract</option>
                                    </select>
                                </div>
                                <div className={`${job.label}`}>
                                    <label for="work_type" >Work type</label>
                                    <span className={`err`}> * </span><br />
                                    <input type="radio" value="Fulltime" /> 
                                    <span>Full time</span><br />	
                                    <input type="radio" value="Parttime" /> 
                                    <span>Part time</span><br />	
                                    <input type="radio" value="Remotework" /> 
                                    <span>Remote work</span><br />	
                                </div>
                                <div className={`${job.label}`}>
                                    <label for="salary" >Salary</label>
                                    <span className={`err`}></span><br />
                                    <input type="text" className={`${job.salary}`} placeholder="Minimum salary" />
                                    <span> - </span>
                                    <input type="text" className={`${job.salary}`} placeholder="Maximum salary" />
                                </div>
                                <div className={`${job.label}`}>
                                    <label for="closing_date" >Job Category</label>
                                    <span className={`err`}> * </span><br />
                                    <select>
                                        <option value="">--Select--</option>
                                        <option value="2">Accounting</option>
                                        <option value="3">Business</option>
                                        <option value="4">Banking</option>
                                        <option value="10">Finance</option>
                                        <option value="11">General</option>
                                        <option value="12">Health</option>
                                        <option value="13">IT</option>
                                        <option value="1">Other</option>
                                        <option value="15">Retails</option>
                                        <option value="16">Sales</option>
                                        <option value="17">Security</option>
                                    </select>
                                </div>
                                <div className={`${job.label}`}>
                                    <label for="closing_date" >Closing date</label>
                                    <span className={`err`}> </span><br />
                                    <input type="date" min="" />
                                </div>
                                <div className={`${job.label}`}>
                                    <label for="job_summary" >Job summary</label>
                                    <span className={`err`}> * </span><br />
                                    <textarea placeholder="Write a short summary about the job here..."></textarea>
                                </div>
                                <div className={`last ${job.label}`}>
                                    <label for="job_requirements" ><strong>Requirements</strong></label><br />
                                    <small><strong>NB: </strong>Here you can state all the requirements needed, skills and more</small>
                                    <ul>
                                        <li>
                                            <input
                                                type="text"
                                                placeholder="Requirement 1"
                                                value={newItemValue}
                                                onChange={(e) => this.setState({ newItemValue: e.target.value })}
                                                />
                                            <button className={`add_more`} onClick={this.handleAddItem}>
                                                <span className="fas fa-plus"></span>
                                            </button>
                                        </li>
                                        {items.map((item, index) => (
                                            <ListItem
                                                key={index}
                                                index={index + 2}
                                                value={item}
                                                onRemove={this.handleRemoveItem}
                                                onChange={this.handleChangeItem}
                                            />
                                        ))}
                                    </ul>
                                </div><br />
                                <div className={`last ${job.label}`}>
                                    <label for="job_qualifications" ><strong>Qualifications</strong></label><br /> 
                                    <small><strong>NB: </strong>Here you can state all the qualifications and certificates that are needed</small>
                                    <ul>
                                        <li>
                                            <input type="text" placeholder="Qualification 1" />
                                            <button className={`add_more`}><span className="fas fa-plus"></span></button><br />
                                        </li>
                                    </ul>
                                </div><br />
                                <div className={`last ${job.label}`}>
                                    <label for="job_duties" ><strong>Duties & Responsibilities</strong> </label><br /> 
                                    <small>
                                        <strong>NB: </strong>
                                        Here you can state all duties that an emplyee will be doing, e.g. answer calls
                                    </small>
                                    <ul>
                                        <li>
                                            <input type="text" placeholder="Duty/Reposibility 1" />
                                            <button className={`add_more`}><span className="fas fa-plus"></span></button><br />
                                        </li>
                                    </ul>
                                </div>
                                <div className={`${job.label}`}>
                                    <button className={`${job.submit_job_update}`}>Submit</button>
                                </div>
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

export default PostJob