import React, {Component} from "react";
import login from "./Login.module.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import HideFooter1 from ';

class Login extends Component{

    constructor(props){
        super(props)

        this.state = ({
            errorMessage: "",
            username: "",
            password: ""
        })
    }

    validateUsernane = event =>{
        this.setState({
            username: event.target.value
        })
    }
    validatePasswords = event =>{
        this.setState({
            password: event.target.value
        })
    }
    handleSubmitLogin = event =>{

        const tempUsername = this.state.username;
        const tempPassword = this.state.password;


        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (emailRegex.test(tempUsername) && passwordRegex.test(tempPassword)) {
            const userData = { tempUsername, tempPassword };
            // send over to the server
            alert("logged in, yey :-)") 
        }else{
            this.setState({
                errorMessage: "Invaid username or password"
            })            
        }
        event.preventDefault()
    }

    render(){
        return(
            <>
                < Header />
                <div className={`row`}>
                    <div className={`col-sm-1`} ></div>
                    <div className={`col-sm-10`} >
                        <div className={`${login.form_container}`} >
                            <form onSubmit={this.handleSubmitLogin}>
                            <div className={`${login.sub_container}`}>
                                    <span className={`${login.error_login_message}`}>
                                        {this.state.errorMessage}
                                    </span>
                                </div>
                                <div className={`${login.sub_container}`}>
                                    <label>
                                        <span className={`fas fa-user`}></span>
                                        <span>Username:</span>
                                    </label><br />
                                    <input 
                                        type="email" 
                                        value={`${this.state.username}`} 
                                        onChange={this.validateUsernane}
                                        placeholder="Enter email address" 
                                        required />
                                </div>
                                <div className={`${login.sub_container}`}>
                                    <label>
                                        <span className={`fas fa-lock`}></span>
                                        <span>Password:</span>
                                    </label><br />
                                    <input 
                                        type="password" 
                                        value={`${this.state.password}`} 
                                        onChange={this.validatePasswords}
                                        placeholder="Enter password" 
                                        required />
                                </div>
                                <div className={`${login.sub_container}`}>
                                    <button 
                                        className={`${login.login_submit}`} 
                                        type="submit">
                                            Login
                                    </button>
                                </div>
                            </form>
                            <div className={`${login.last_container}`}>
                                <div>
                                    <a href="#">Forgot password</a>
                                </div>
                                <div className={`${login.register}`}>
                                    <a href="#">Create new account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-1`} ></div>
                </div>
                < Footer />
            </>
        )
    }
}

export default Login