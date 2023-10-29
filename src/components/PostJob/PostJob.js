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
            jobId: job?.jobId || "",
            companyId: job?.companyId || "",
            jobTitle: job?.jobTitle || "",
            jobDescription: job?.jobDescription || "",
            remoteWork: job?.remoteWork || false,
            jobType: job?.jobType || "",
            jobSalary: job?.jobSalary || 0,
            jobCategory: job?.jobCategory || "",
            jobLocation: job?.jobLocation || "",
            closingDate: job?.closingDate || "",

            todayDate: new Date().toISOString().slice(0, 10),
            limitList: 4,

            requrementsItems: [],
            qualificationsItems: [],
            dutiesItems: [],
            newItemValue: ''
        }    
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { jobId, companyId, jobTitle, jobDescription, remoteWork, jobType, workType, jobSalary, 
            jobCategory, jobLocation, closingDate, requrementsItems, qualificationsItems, dutiesItems } = this.state;
        const job = { jobId, companyId, jobTitle, jobDescription, remoteWork, jobType, workType, 
            jobSalary, jobCategory, jobLocation, closingDate };
        console.log(job);
        console.log(requrementsItems)
        console.log(qualificationsItems)
        console.log(dutiesItems)
        
        // fetch('http://localhost:3000/api/jobs', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(job)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    };

    // handleInputChange = (index, event) => {
    //     const { value } = event.target.value;
    //     this.setState((prevState) => {
    //         const updatedRequrementsItems = [...prevState.requrementsItems];
    //         updatedRequrementsItems[index].text = value;
    //         return { requrementsItems: updatedRequrementsItems };
    //     });
    // };
    handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
      
        if (type === 'radio' || type === 'checkbox') {
          // Handle radio and checkbox inputs
          this.setState({ [name]: type === 'checkbox' ? checked : value });
        } else if (type === 'select-one') {
            // Handle select element with a single option
            this.setState({ [name]: value });
        } else {
          // Handle other input types (text, email, password, textarea, etc.)
          this.setState({ [name]: value });
        }
    };
    handleListItemInputChange = (event, itemId) => {
        const { name, value } = event.target;
    
        this.setState((prevState) => {
          const updatedItemList = prevState.itemList.map((item) => {
            if (item.id === itemId) {
              return { ...item, [name]: value };
            }
            return item;
          });
    
          return { itemList: updatedItemList };
        });
      };
      
    handleAddRequirements = () => {
        if(this.state.requrementsItems.length == this.state.limitList){
            return
        }
        this.setState((prevState) => ({
            requrementsItems: [...prevState.requrementsItems, { text: '', placeholder: 'Requirement '}],
        }));
    };
    handleAddQualifications = () => {
        if(this.state.qualificationsItems.length == this.state.limitList){
            return
        }
        this.setState((prevState) => ({
            qualificationsItems: [...prevState.qualificationsItems, { text: '', placeholder: 'Qualification '}],
        }));
    };
    
    handleAddDuties = () => {
        if(this.state.dutiesItems.length == this.state.limitList){
            return
        }
        this.setState((prevState) => ({
            dutiesItems: [...prevState.dutiesItems, { text: '', placeholder: 'Duty/Responsibility '}],
        }));
    };

    handleRemoveRequrements = (value) => {
        this.setState({
            requrementsItems: this.state.requrementsItems.filter(item => item !== value),
        });
    }
    handleRemoveQualifications = (value) => {
        this.setState({
            qualificationsItems: this.state.qualificationsItems.filter(item => item !== value),
        });
    }
    handleRemoveDuty = (value) => {
        this.setState({
            dutiesItems: this.state.dutiesItems.filter(item => item !== value),
        });
    }

    handleChangeRequirements = (value) => {
        this.setState({
            requrementsItems: this.state.requrementsItems.filter(item => item !== value),
        });
    }
    handleChangeQualifications = (value) => {
        this.setState({
            qualificationsItems: this.state.qualificationsItems.filter(item => item !== value),
        });
    }
    handleChangeDuty = (value) => {
        this.setState({
            dutiesItems: this.state.dutiesItems.filter(item => item !== value),
        });
    }

    render(){
        const { requrementsItems, qualificationsItems, dutiesItems, newItemValue } = this.state;
        return(
            <>
                <Header />
                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10`}>
                        <h5>Manage job</h5>
                        <p>Use this form below to manage and post new jobs</p>
                        <form onSubmit={this.handleSubmit}>
                            <input type="hidden" value={this.state.jobId} />
                            <div className={`${job.container}`} >
                                <div className={`${job.form}`}>
                                    <div className={`${job.label}`}>
                                        <label htmlFor={`${job.job_title}`}>Job title</label>
                                        <span className={`err`}> * </span><br />
                                        <input type="text" 
                                            name="jobTitle"
                                            value={this.state.jobTitle} 
                                            // onChange={this.handleJobTitle} 
                                            onChange={this.handleInputChange} 
                                            className={`${job.job_title}`} 
                                            placeholder="Enter job title" />
                                    </div>
                                    <div className={`${job.label}`}>
                                        <label htmlFor="remote_work" ></label>
                                        <input type="checkbox" 
                                            name="remoteWork"
                                            checked={this.state.subscribe}
                                            // onChange={this.handleRemoteWork}
                                            onChange={this.handleInputChange} />
                                        <span>Remote work</span>
                                    </div>
                                    <div className={`${job.label}`}>
                                        <label htmlFor="job_location" >Location </label>
                                        <span className={`err`}> * </span><br />
                                        <input type="text" 
                                            name="jobLocation"
                                            value={this.state.jobLocation} 
                                            // onChange={this.handleJobLocation} 
                                            onChange={this.handleInputChange} 
                                            placeholder="E.g. Johannesburg" />
                                    </div>
                                    <div className={`${job.label}`}>
                                        <label htmlFor="job_type" >Job type</label>
                                        <span className={`err`}> * </span><br />
                                        <select
                                            value={this.state.jobType}
                                            name="jobType"
                                            // onChange={this.state.handleJobType}
                                            onChange={this.handleInputChange} >
                                            <option value="">--Select--</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Permanent">Permanent</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                    <div className={`${job.label}`}>
                                        <label htmlFor="work_type" >Work type</label>
                                        <span className={`err`}> * </span><br />
                                        <input type="radio"
                                            name="workType"
                                            value="Fulltime"
                                            checked={this.state.workType === 'fulltime'}
                                            // onChange={this.handleWorkType} 
                                            onChange={this.handleInputChange} /> 
                                        <span>Full time</span><br />	
                                        <input type="radio" 
                                            name="workType"
                                            value="parttime" 
                                            checked={this.state.workType === 'parttime'}
                                            // onChange={this.handleWorkType} 
                                            onChange={this.handleInputChange} />  
                                        <span>Part time</span><br />	
                                        <input type="radio" 
                                            name="workType"
                                            value="remotework" 
                                            checked={this.state.workType === 'remotework'}
                                            // onChange={this.handleWorkType} 
                                            onChange={this.handleInputChange} />  
                                        <span>Remote work</span><br />	
                                    </div>
                                    <div className={`${job.label}`}>
                                        <label htmlFor="salary" >Salary</label>
                                        <span className={`err`}></span><br />
                                        <input type="text" 
                                            name="jobSalary"
                                            value={this.state.minSalary}
                                            // onChange={this.handleMinSalary}
                                            onChange={this.handleInputChange}   
                                            className={`${job.salary}`} 
                                            placeholder="Minimum salary" />
                                        <span> - </span>
                                        <input type="text"
                                            name="jobSalary" 
                                            value={this.state.maxSalary}
                                            // onChange={this.handleMaxSalary} 
                                            onChange={this.handleInputChange} 
                                            className={`${job.salary}`} 
                                            placeholder="Maximum salary" />
                                    </div>
                                    <div className={`${job.label}`}>
                                        <label htmlFor="closing_date" >Job Category</label>
                                        <span className={`err`}> * </span><br />
                                        <select
                                            value={this.state.jobCategory}
                                            name="jobCategory"
                                            // onChange={this.state.handleJobCategory}
                                            onChange={this.handleInputChange}  >
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
                                        <label htmlFor="closing_date" >Closing date</label>
                                        <span className={`err`}> </span><br />
                                        <input type="date" 
                                            name="closingDate"
                                            value={this.state.closingDate}
                                            // onChange={this.handleClosingDate} 
                                            onChange={this.handleInputChange} 
                                            min={this.state.todayDate} />
                                    </div>
                                    <div className={`${job.label}`}>
                                        <label htmlFor="job_summary" >Job summary</label>
                                        <span className={`err`}> * </span><br />
                                        <textarea 
                                            value={this.state.jobSummary}
                                            name="jobDescription"
                                            // onChange={this.handleJobSummary}
                                            onChange={this.handleInputChange}  
                                            placeholder="Write a short summary about the job here..." />
                                    </div>
                                    <div className={`last ${job.label}`}>
                                        <label htmlFor="job_requirements" ><strong>Requirements</strong></label><br />
                                        <small><strong>Note: </strong>Here you can state all the requirements needed, skills and more</small>
                                        <ul>
                                            <li>
                                                <input
                                                    type="text"
                                                    placeholder="Requirement 1"
                                                    value={newItemValue}
                                                    onChange={(e) => this.setState({ newItemValue: e.target.value })}
                                                    />
                                                <button className={`add_more`} onClick={this.handleAddRequirements}>
                                                    <span className="fas fa-plus"></span>
                                                </button>
                                            </li>
                                            {requrementsItems.map((item, index) => (
                                                <ListItem
                                                    key={index}
                                                    index={index + 2}
                                                    value={item}
                                                    onRemove={this.handleRemoveRequrements}
                                                    onChange={this.handleChangeRequirements}
                                                />
                                            ))}
                                        </ul>
                                    </div><br />
                                    <div className={`last ${job.label}`}>
                                        <label htmlFor="job_qualifications" ><strong>Qualifications</strong></label><br /> 
                                        <small><strong>Note: </strong>Here you can state all the qualifications and certificates that are needed</small>
                                        <ul>
                                            <li>
                                                <input
                                                    type="text"
                                                    placeholder="Qualification 1"
                                                    value={newItemValue}
                                                    onChange={(e) => this.setState({ newItemValue: e.target.value })}
                                                    />
                                                <button className={`add_more`} onClick={this.handleAddQualifications}>
                                                    <span className="fas fa-plus"></span>
                                                </button>
                                            </li>
                                            {qualificationsItems.map((item, index) => (
                                                <ListItem
                                                    key={index}
                                                    index={index + 2}
                                                    value={item}
                                                    onRemove={this.handleRemoveQualifications}
                                                    onChange={this.handleChangeQualifications}
                                                />
                                            ))}                                        
                                        </ul>
                                    </div><br />
                                    <div className={`last ${job.label}`}>
                                        <label htmlFor="job_duties" ><strong>Duties & Responsibilities</strong> </label><br /> 
                                        <small>
                                            <strong>Note: </strong>
                                            Here you can state all duties that an emplyee will be doing, e.g. answer calls
                                        </small>
                                        <ul>
                                        <li>
                                                <input
                                                    type="text"
                                                    placeholder="Duty/Responsibility 1"
                                                    value={newItemValue}
                                                    onChange={(e) => this.setState({ newItemValue: e.target.value })}
                                                    />
                                                <button className={`add_more`} onClick={this.handleAddDuties}>
                                                    <span className="fas fa-plus"></span>
                                                </button>
                                            </li>
                                            {dutiesItems.map((item, index) => (
                                                <ListItem
                                                    key={index}
                                                    index={index + 2}
                                                    value={item}
                                                    onRemove={this.handleRemoveDuty}
                                                    onChange={this.handleChangeDuty}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={`${job.label}`}>
                                        <button className={`${job.submit_job_update}`}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={`col-sm-1`}></div>
                </div>
                <Footer />
            </>
        )
    }
}

export default PostJob