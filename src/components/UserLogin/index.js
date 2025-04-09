import React, { useState } from "react"
// import "./style.css"
import "../../assets/global.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
    

function UserLogin() {

    require("./style.css")

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [username_error, setUsername_error] = useState('');
    const [password_error, setPassword_error] = useState('');
    const [detail_error, setDetail_error] = useState('');

    const { token } = useContext(UserContext)
    const { setToken } = useContext(UserContext)
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext)

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault()
        
        const userinstance = { username, password }
        
        fetch('http://localhost:8000/users/login/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userinstance)})
            .then(response => response.json())
            .then(json => {

                if (json['username']) {
                    setUsername_error(json['username'])
                }
                else {
                    setUsername_error("")
                }
                if (json['password']){
                    setPassword_error(json['password'])
                }
                else {
                    setPassword_error("")
                }
                if (json['access']) {
                    setToken(json['access'])
                    console.log("Login token", json['access'])
                    fetch('http://localhost:8000/users/profile/', {
                        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + json['access'], "Accept": "application/json"},
                        })
                        .then(response => response.json())
                        .then(json => {
                            setUser(json)
                            console.log(token)
                    })
                    navigate('/users/feed/')
                }
                else {
                    setDetail_error(json['detail'])
                }
            })
    }
 
    
    return(
        <div id="big-container">
            <section className="vh-10 vw-100 d-flex justify-content-center align-items-center" id="loginbg">
            <div id="logincontainer" className="d-flex justify-content-center">
                <div className="card bg-dark text-white" id="loginform">
                    <div className="row no-gutters">
                        <div className="col">
                            <form className="p-5" onSubmit={submitHandler}>
                                <h1 className="mb-3">Log In</h1>
                                {detail_error && <div className="error_message"> {detail_error} </div>}
                                <div className="mb-3" id="loginEmail">
                                    <label htmlFor="userUsername" className="form-label">User Name</label><br/>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control-lg" id="userUsername"/>
                                    {username_error && <div className="error_message"> {username_error} </div>}
                                </div>
                                <div className="mb-3" id="loginPassword">
                                    <label htmlFor="userPassword" className="form-label">Password</label><br/>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control-lg" id="userPassword"/>
                                    {password_error && <div className="error_message"> {password_error} </div>}
                                </div>
                                <div className="mb-3 form-check" id="loginRememberPassword">
                                    <input type="checkbox" className="form-check-input" id="rememberPassCheck"/>
                                    <label htmlFor="rememberPassCheck" className="form-label">Remember password</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Log In</button>
                                <div className="mt-3">
                                    Are you a new customer? <Link to="/users/register/customer/" className="link-primary">Sign up.</Link> &nbsp; &nbsp;
                                    Do you own a restaurant? <Link to="/users/register/owner/" className="link-primary">Sign up.</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col" id="loginimage"></div>
            </div>

            
        </section>
    </div>
    )
}

export default UserLogin