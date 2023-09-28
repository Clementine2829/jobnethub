import React, { Component } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Searcher from "../Searcher/Searcher";
import JobFunctions from "./JobFunction"
import home from './Home.module.css'
import jobs from "../JobListing/Jobs";
import "./searcher.css"
import JobByLocation from "./JobByLocation";

class Home extends Component{
    constructor(props){
        super(props)
    }

    filterJobs(){
        const startIndex = 0;
        const numberOfItems = 6;
        return jobs.slice(startIndex, numberOfItems);
    }

    render(){        
        return(
            <>
                < Header />

                <div className={`${home.backgroundContainer}`}>
                    < Searcher variant="Home" />
                </div>                

                <div>
                    <p className={`${home.createResume}`}>
                        <strong>
                            Need a professional CV? click <a href="#">here</a> to create your CV 
                        </strong>
                    </p>
                </div>
                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10`}>
                        {/* <div style={{"float":"left", "width":"100%"}}> */}
                            < JobFunctions jobs={this.filterJobs()}/>
                        {/* </div> */}
                    </div>
                    <div className={`col-sm-1`}></div>
                </div>

                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10`}>
                        < JobByLocation />
                    </div>
                    <div className={`col-sm-1`}></div>
                </div>
                < Footer />
            </>
        )
    }
}

export default Home