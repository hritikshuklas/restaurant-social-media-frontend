import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
// import "./style.css"
import "../../assets/global.css"
import 'bootstrap/dist/css/bootstrap.min.css'


function UserSignUp() {
    require("./style.css")
    
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhonenumber] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    
    const [pfp_url, setUserPfp] = useState('');
    const [cover_url, setUserCover] = useState('');

    const [username_error, setUsername_error] = useState('');
    const [password1_error, setPassword1_error] = useState('');
    const [password2_error, setPassword2_error] = useState('');
    const [first_name_error, setFirst_name_error] = useState('');
    const [last_name_error, setLast_name_error] = useState('');
    const [phone_number_error, setPhone_number_error] = useState('');
    const [email_error, setEmail_error] = useState('');
    const [match_error, setMatch_error] = useState('');
    const [exist_error, setExist_error] = useState('');

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault()
        
        const user = { first_name, last_name, username, email, phone_number, password1, password2, pfp_url, cover_url }
        var username_set = false

        if (!first_name) {
            setFirst_name_error('This field is required')
        } else {
            setFirst_name_error('')
        }
        if (!last_name) {
            setLast_name_error('This field is required')
        }else {
            setLast_name_error('')
        }if (!username) {
            setUsername_error('This field is required')
        }else {
            username_set = true
            setUsername_error('')
        }if (!email) {
            setEmail_error('This field is required')
        }else {
            setEmail_error('')
        }if (!phone_number) {
            setPhone_number_error('This field is required')
        }else {
            setPhone_number_error('')
        }if (!password1) {
            setPassword1_error('This field is required')
        }else {
            setPassword1_error('')
        }if (!password2) {
            setPassword2_error('This field is required')
        }else {
            setPassword2_error('')
        }    
        
        if (password1 !== password2) {
            setMatch_error('Passwords do not match')
        }
        

        if (username_set) {fetch('http://localhost:8000/users/register/customer/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)})
            .then(response => response.json())
            .then(json => {
                if (json['error'] === 1) {
                    setExist_error(json['exist_error'])
                }
                else {
                    
                    navigate('/users/login/')
                }
                console.log(json)})
        }
    }
 
    
    return(
        <div id="big-container">
        <div id="background"></div>
        <section className="vh-50 vw-100 d-flex justify-content-center align-items-center" id="signupbg">
            <div id="signupcontainer" className="d-flex justify-content-center">
                <div className="col" id="signupimage"></div>
                <div className="card bg-dark text-white" id="signupformbody">
                    <div className="row no-gutters">
                        <div className="col">
                            <form className="p-5" id="signupform" onSubmit={submitHandler}>
                                <h1 className="mb-4">User Sign Up</h1>
                                <h4 className="mb-2">Personal Information</h4>
                                <div className="mb-3 row" id="signupName">
                                    <div className="row no-gutters">
                                        <div className="col" id="signupFirstName">
                                            <label htmlFor="userFirstName" className="form-label">First Name</label><br/>
                                            <input value={first_name} onChange={(e) => setFirstname(e.target.value)} type="text" className="form-control-lg" id="userFirstName"/>
                                            {first_name_error && <div className="error_message"> {first_name_error} </div>}
                                        </div>
                                        <div className="col" id="signupLastName">
                                            <label htmlFor="userLastName" className="form-label">Last Name</label><br/>
                                            <input value={last_name} onChange={(e) => setLastname(e.target.value)} type="text" className="form-control-lg" id="userLastName"/>
                                            {last_name_error && <div className="error_message"> {last_name_error} </div>}
                                        </div>
                                        <div className="col" id="signupUsername">
                                            <label htmlFor="userUsername" className="form-label">User Name</label><br/>
                                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control-lg" id="userUsername"/>
                                            {username_error && <div className="error_message"> {username_error} </div>}
                                            {exist_error && <div className="error_message"> {exist_error} </div>}
                                        </div>        
                                    </div>
                                </div>

                                <h4 className="mb-2">Contact Information</h4>
                                <div className="mb-3" id="signupEmail">
                                    <label htmlFor="userEmail" className="form-label">Email address</label><br/>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control-lg" id="userEmail" aria-describedby="emailHelp"/>
                                    {email_error && <div className="error_message"> {email_error} </div>}
                                </div>
                                <div className="mb-3" id="signupPfp">
                                    <label htmlFor="userPfp" className="form-label">User Profile Picture URL</label><br/>
                                    <input value={pfp_url} onChange={(e) => setUserPfp(e.target.value)} type="text" className="form-control-lg" id="userRestaurantLogo"/>
                                </div>
                                <div className="mb-3" id="signupCover">
                                    <label htmlFor="userCover" className="form-label">User Profile Cover URL</label><br/>
                                    <input value={cover_url} onChange={(e) => setUserCover(e.target.value)} type="text" className="form-control-lg" id="userRestaurantCover"/>
                                </div>

                                <div className="mb-3" id="signupPhoneNumber">
                                    <label htmlFor="userPhoneNumber" className="form-label">Phone Number</label><br/>
                                    <input value={phone_number} onChange={(e) => setPhonenumber(e.target.value)} type="text" className="form-control-lg" id="userPhoneNumber"/>
                                    {phone_number_error && <div className="error_message"> {phone_number_error} </div>}
                                </div>
                                <div className="mb-3" id="signupPassword">
                                    <label htmlFor="userPassword" className="form-label">Enter Password</label><br/>
                                    <input value={password1} onChange={(e) => setPassword1(e.target.value)} type="password" className="form-control-lg" id="userPassword"/>
                                    {password1_error && <div className="error_message"> {password1_error} </div>}
                                </div>
                                <div className="mb-3" id="signupConfirmPassword">
                                    <label htmlFor="userConfirmPassword" className="form-label">Confirm Password</label><br/>
                                    <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" className="form-control-lg" id="userConfirmPassword"/>
                                    {password2_error && <div className="error_message"> {password2_error} </div>}
                                    {match_error && <div className="error_message"> {match_error} </div>}
                                </div>
                                <div className="mb-3 htmlForm-check" id="signupAcceptAgreement">
                                    <input type="checkbox" className="form-check-input" id="userAgreement"/>
                                    <label htmlFor="userAgreement" className="form-label">I accept the terms and conditions.</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>            
            </div>     
        </section>
    </div>
    )
}

export default UserSignUp