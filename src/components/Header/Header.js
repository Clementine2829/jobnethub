import React, {Component} from "react";
import { useHistory  } from 'react-router-dom';
import logo from '../../asserts/logo2.png';
import header from './Header.module.css'
import Paths from "./PathConstants"

class Header extends Component{
    constructor(props){
        super(props)

        const { user } = props

        this.state = ({
            userId: user?.userId || "",
            firstName: user?.firstName || "",
            activeWindow: this.getAbsolutePath(),
        })
        
    }

    getAbsolutePath = () => {
        const absoluteURL = window.location.href;
        const urlObject = new URL(absoluteURL);
        return urlObject.pathname;
        // if(absolutePath === "/") return Paths.HOME;
        // else if(absolutePath === "/home") return Paths.HOME;
        // else if(absolutePath === "/jobs") return Paths.JOBS;
        // else if(absolutePath === "/jobs/update") return Paths.JOBS_UPDATE;
        // else if(absolutePath === "/about") return Paths.ABOUT_US;
        // else if(absolutePath === "/contact") return Paths.CONTACT_US;
        // else if(absolutePath === "/login") return Paths.LOGIN;
        // else if(absolutePath === "/register") return Paths.REGISTER;
        // else return Paths.HOME; 
    }
    navigateToLogin = () => {
        this.props.history.push(Paths.LOGIN);
    }
    navigateToRegister = () => {
        this.props.history.push(Paths.REGISTER);
    }
    // navigateTo = (url) => {
    //     const history = useHistory();
    //     history.push(url);
    // };
    navigateTo = (url) => {
        window.location.href = url;
    };
    render(){
        return(
            <>
                <nav className={`${header.nav} navbar navbar-expand-sm navbar-dark`}>
                    <div className="container-fluid">
                        <div>
                            <a className="navbar-brand" onClick={()=> window.location.href="./"} href="#">
                                <img src={logo} className={header.navLogo} alt="logo" />                            
                            </a>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarlinks">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarlinks">
                            <ul className={`navbar-nav mx-auto ${header.navLinks}`}>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className={`nav-link 
                                    ${(this.state.activeWindow === Paths.HOME? "active":"")}`} 
                                    onClick={()=> window.location.href=Paths.HOME} 
                                    href="#">HOME</a>
                                </li>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className={`nav-link 
                                    ${(this.state.activeWindow === Paths.JOBS? "active":"")}`} 
                                    onClick={()=> window.location.href=Paths.JOBS} 
                                        href="#">JOBS LISTING</a>
                                </li>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className={`nav-link 
                                    ${(this.state.activeWindow === Paths.JOBS_UPDATE? "active":"")}`} 
                                    onClick={()=> window.location.href=Paths.JOBS_UPDATE}
                                        href="#">POST A JOB</a>
                                </li>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className={`nav-link 
                                    ${(this.state.activeWindow === Paths.ABOUT_US? "active":"")}`} 
                                    onClick={()=> window.location.href=Paths.ABOUT_US} 
                                        href="#">ABOUT US</a>
                                </li>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className={`nav-link 
                                    ${(this.state.activeWindow === Paths.CONTACT_US? "active":"")}`} 
                                    onClick={()=> window.location.href=Paths.CONTACT_US} 
                                        href="#">CONTACT US</a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                {/* <input className="form-control me-2" type="text" placeholder="Search" />
                                <button className="btn btn-primary" type="button">Search</button> */}
                                <button 
                                    onClick={this.navigateToRegister}
                                    className={`${header.btnHeader} ${header.btnCreateAccount}`}>
                                    Create account
                                </button>
                                <button 
                                    onClick={this.navigateToLogin}
                                    // onClick={() => this.navigateTo('/login')}
                                    className={`${header.btnHeader} ${header.btnLogin}`}>
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Header;
