import React, {Component} from "react";
import { Link } from 'react-router-dom';
import logo from '../../asserts/logo2.png';
import header from './Header.module.css'

class Header extends Component{
    constructor(props){
        super(props)

        const { user } = props

        this.state = ({
            userId: user?.userId || "",
            firstName: user?.firstName || "",
        })
    }

    navigateToLogin = () => {
      window.location.href = '/login';
    }
    navigateToRegister = () => {
      window.location.href = '/register';
    }

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
                                    <a className={`nav-link active`} onClick={()=> window.location.href="./"} href="#">HOME</a>
                                </li>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className="nav-link" onClick={()=> window.location.href="./jobs"} href="#">JOBS LISTING</a>
                                </li>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className="nav-link" onClick={()=> window.location.href="./post"}href="#">POST A JOB</a>
                                </li>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className="nav-link" onClick={()=> window.location.href="./about"} href="#">ABOUT US</a>
                                </li>
                                <li className={`nav-item ${header.navLinkItem}`}>
                                    <a className="nav-link" onClick={()=> window.location.href="./contact"} href="#">CONTACT US</a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                {/* <input className="form-control me-2" type="text" placeholder="Search" />
                                <button className="btn btn-primary" type="button">Search</button> */}
                                <button 
                                    onClick={this.navigateToRegister}
                                    className={`${header.btnHeader} ${header.btnCreateAccount}`}>
                                        {/* <Link to="/register"> */}
                                            Create account
                                        {/* </Link> */}
                                </button>
                                <button 
                                    onClick={this.navigateToLogin}
                                    className={`${header.btnHeader} ${header.btnLogin}`}>
                                        {/* <Link to="/login"> */}
                                            Login
                                        {/* </Link> */}
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
