import React, { Component } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Searcher from "../Searcher/Searcher";
import home from './Home.module.css'
import "./searcher.css"

class Home extends Component{

    render(){
        return(
            <>
                < Header />

                <div className={`${home.backgroundContainer}`}>
                    < Searcher variant="Home" />
                </div>                

                <div>
                    {/* feat6ured jobs */}
                    
                </div>

                <div>
                {/* Jobs by towns */}

                </div>

                < Footer />
            </>
        )
    }
}

export default Home