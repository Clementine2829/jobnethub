import React, {Component} from "react";
import about from './About.module.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class About extends Component{
    render(){
        return(
            <>
                <Header />
                <div className={`row`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-10`}>      
                        <div className={`${about.container}`}>
                            <h3>About us</h3>      
                            <p>
                                Welcome to JobNestHub, your ultimate destination for finding the 
                                perfect job match! We are an innovative online platform dedicated 
                                to connecting talented individuals with exciting career 
                                opportunities. With our user-centric approach and 
                                cutting-edge technology, we strive to revolutionize 
                                the way job seekers and employers connect.<br /><br />

                                At JobNestHub, we understand that searching for a job can be 
                                overwhelming, which is why we have designed a user-friendly 
                                interface that makes the process seamless and stress-free. 
                                Our extensive job listings encompass various industries, 
                                ensuring that you have access to a wide range of positions 
                                tailored to your skills and aspirations. With advanced 
                                search options and customizable filters, finding your 
                                dream job has never been easier.<br /><br />

                                Not only do we provide exceptional job listings, but we also 
                                offer additional services to enhance your job search experience. 
                                From resume tips and interview guidance to career development 
                                resources, we are committed to empowering you with the tools 
                                and knowledge necessary to succeed in your professional journey.<br /><br />

                                With JobNestHub, you can rest assured that you are joining a 
                                community driven by integrity, transparency, and professionalism. 
                                Our dedicated team of experts is passionate about helping you 
                                achieve your career goals and creating meaningful connections 
                                between talented individuals and top-notch employers.<br /><br />

                                Join us today and let JobNestHub be your trusted ally in navigating 
                                the competitive job market. Together, we will unlock endless 
                                possibilities and pave the way to a rewarding and fulfilling career.<br />
                            </p>
                        </div>
                    </div>
                    <div className={`col-sm-1`}></div>
                </div>
                <Footer />
            </>            
        )
    }
}

export default About