import React, { Component } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Searcher from "../Searcher/Searcher";
import JobFunctions from "./JobFunction"
import home from './Home.module.css'
import JobsFetcher from "../Server/Jobs";
import "./searcher.css"
import JobByLocation from "./JobByLocation";

class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            jobs: [],
            startIndex: 0,
            numberOfItems: 6,
        };
    }
  
    onDataFetched = (data) => {
    
        const parsedData = data.map(item => ({
            ...item,
            company: JSON.parse(item.company),
            category: JSON.parse(item.category)
        }));
    
        this.setState({
            jobs: parsedData,
        });

        this.filterJobs();
    };

    filterJobs(){
        console.log(this.state.jobs)
        const startIndex = this.state.startIndex;
        const numberOfItems = this.state.numberOfItems;
        return this.state.jobs.slice(startIndex, numberOfItems);
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

                        <div>
                            {/* <pre>{JSON.stringify(this.state.jobs, null, 2)}</pre> */}
                        </div>
                        <JobsFetcher onDataFetched={this.onDataFetched} />

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