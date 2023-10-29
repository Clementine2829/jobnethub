import React, {Component} from "react";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import contact from './Contact.module.css'

class Contacts extends Component{
    render(){
        return(
            <>
                <Header />

                <div className={`row ${contact.row}`}>
                    <div className={`col-sm-1`}></div>
                    <div className={`col-sm-6`}>
                        <h2>Contact us</h2>
                        <p>Use the form to write to us.</p>
                        <p>We would also like to hear from you on socials. Lets connect </p>
                        <p className={`${contact.social}`}>
                            <a hre="#"><span className="fa fa-facebook"></span></a>
                            <a hre="#"><span className="fa fa-twitter"></span></a>
                            <a hre="#"><span className="fa fa-linkedin"></span></a>
                            <a hre="#"><span className="fa fa-instagram"></span></a>
                            <a hre="#"><span className="fa fa-whatsapp"></span></a>
                        </p>
                    </div>
                    <div className={`col-sm-4`}>
                        <div className={`${contact.mainContainer}`}>
                            <div className={`${contact.names} ${contact.container}`}>
                                <label for="firstName">First Name *</label><br />
                                <input type="text" placeholder="Your name" />
                                <span className={`${contact.err}`}></span>
                            </div>
                            <div className={`${contact.names} ${contact.container}`}>
                                <label for="lastName">Last Name *</label><br />
                                <input type="text" placeholder="Your surname" />
                                <span className={`${contact.err}`}></span>
                            </div>
                            <div className={`${contact.container}`}>
                                <label for="email">Email *</label><br />
                                <input type="email" placeholder="Your email address" />
                                <span className={`${contact.err}`}></span>
                            </div>
                            <div className={`${contact.container}`}>
                                <label for="message">What can we help you with * </label><br />
                                <textarea placeholder="Type your message here..."></textarea>
                            </div>
                            <div className={`${contact.container}`}>
                                <button>Submit</button>
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

export default Contacts