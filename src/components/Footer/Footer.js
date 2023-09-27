import React, {Component} from "react";
import footer from "./Footer.module.css"

class Footer extends Component{
    constructor(props) {
        super(props);

        this.state = ({
          year: new Date().getFullYear(),
          subscribeEmail:"",
          subscribeEmailError:""
        });
    }
    componentDidMount() {
        // Set up a timer to update the year every second (adjust as needed)
        this.yearTimer = setInterval(() => {
          this.setState({
            year: new Date().getFullYear(),
          });
        }, 1000); // Update every 1000 milliseconds (1 second)
    }

    componentWillUnmount() {
        // Clear the timer when the component is unmounted
        clearInterval(this.yearTimer);
    }
    
    handleEmail = event => {
        this.setState({
            subscribeEmail: event.target.value
        })
    }


    validateEmail = email => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return email.match(pattern);
    }
      
    handleSubscribe = event => {
        alert(this.state.subscribeEmail)
        if(this.state.subscribeEmail == ""){
            this.state.subscribeEmailError = "Email address is required"
        }else if(!this.validateEmail(this.state.subscribeEmail)){
            this.state.subscribeEmailError = "Invalid email address"
        }else{
            // send to server and clear form
            this.state.subscribeEmailError = ""
            this.state.subscribeEmail = ""
        }
        event.preventDefault()
    }

    render(){
        return(
            <>
                <div className={`row ${footer.row} ${footer.row1}`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10 footer1 ${footer.footer1}`}>
                        <div className={`${footer.footer1SubFooter}`}>
                            <h4>JOB NEST HUB</h4>
                            <strong className={`${footer.organization}`}>Lift your career...</strong><br />
                            <span>
                            Job Nest Hub is a prominent job portal that assists job 
                            seekers across the country in finding employment opportunities. 
                            We offer job seekers a range of options posted by registered recruiters
                             and employers. Our mission is to bring together two important groups
                              of people: job seekers and recruiters. Our ultimate goal is to 
                              connect the right candidates with the right job opportunities at 
                              the right time, ensuring both job seekers and recruiters achieve 
                              satisfaction and success. If you're looking to post a job, 
                              we're here to help you achieve your hiring goals
                            </span>
                        </div>
                        <div className={`${footer.footer1SubFooter}`}>
                            <h4>Navigator</h4>
                            <span>
                                <span className={`${footer.links}`}>
                                    <a href="#">Home</a>
                                </span><br />
                                <span className={`${footer.links}`}>
                                    <a href="#">Our Services</a>
                                </span><br />
                                <span className={`${footer.links}`}>
                                    <a href="#">About us</a>
                                </span><br />
                                <span className={`${footer.links}`}>
                                    <a href="#">Contact us</a>
                                </span><br />
                            </span>
                        </div>
                        <div className={`${footer.footer1SubFooter}`}>
                            <h4 className={`${footer.hideThis}`}>Hi</h4>
                            <span className={`${footer.links}`}><a href="#">Create resume</a></span><br />			
                            <span className={`${footer.links}`}><a href="#">Job Listing</a></span><br />
                            <span className={`${footer.links}`}><a href="#">Employer & Recruters</a></span><br />
                            <span className={`${footer.links}`}><a href="#">Post Job</a></span><br />
                        </div>
                        <div className={`${footer.footer1SubFooter}`}>
                            <h4 className={`${footer.hideThis}`}>Hi</h4>
                            <span className={`${footer.links}`}><a href="#">FAQs</a></span><br />
                            <span className={`${footer.links}`}><a href="#">Terms of Use</a></span><br />			
                            <span className={`${footer.links}`}><a href="#">Privacy Policy</a></span><br />
                            <span className={`${footer.links}`}><a href="#">Cookie Policy</a></span><br />
                    </div>
                    <div className={`${footer.footer1SubFooter}`}>
                        <h4 className={`${footer.hideThis}`}>Hi</h4>
                            <p>Subscribe to our mailing list to get the news, jobs and updates to your mailbox.</p>
                            <div>
                                <span className={`${footer.err}`}>{this.state.subscribeEmailError}</span>
                                <input 
                                    type="email" 
                                    value={this.state.subscribeEmail} 
                                    onChange={this.handleEmail}
                                    placeholder="Enter your email address..." /><br />
                                <input type="button" onClick={this.handleSubscribe} value="Subscribe" />
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-1`}></div>
                </div>
                
                <div className={`row ${footer.row} ${footer.row2}`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10 ${footer.footer2}`}>
                        <div className={`row`}>
                            <div className={`col-sm-6 ${footer.footer2SubFooter}`}>
                                <i className={`${footer.copyRight}`}>Copyright © {this.state.year} All rights reserved | JOB NEST HUB</i>
                            </div>
                            <div className={`col-sm-6 ${footer.footer2SubFooter}`}>
                                <div className={`${footer.social}`}>
                                    <a hre="#"><span className="fa fa-facebook"></span></a>
                                    <a hre="#"><span className="fa fa-twitter"></span></a>
                                    <a hre="#"><span className="fa fa-linkedin"></span></a>
                                    <a hre="#"><span className="fa fa-instagram"></span></a>
                                    <a hre="#"><span className="fa fa-whatsapp"></span></a>
                                </div>
                            </div>			
                        </div>		
                    </div>
                    <div className={`col-sm-1`}></div>
                </div>
            </>
        )
    }
}

export default Footer