import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
// import "./style.css"
import "../../assets/global.css"
import 'bootstrap/dist/css/bootstrap.min.css'


function RestaurantSignUp() {

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

    const [rest_name, setRest_name] = useState('');
    const [rest_bio, setRest_bio] = useState('');
    const [rest_phone, setRest_phone] = useState('');
    const [rest_address, setRest_address] = useState('');

    const [rest_cover, setRest_cover] = useState('');
    const [rest_logo, setRest_logo] = useState('');

    const [username_error, setUsername_error] = useState('');
    const [password1_error, setPassword1_error] = useState('');
    const [password2_error, setPassword2_error] = useState('');
    const [first_name_error, setFirst_name_error] = useState('');
    const [last_name_error, setLast_name_error] = useState('');
    const [phone_number_error, setPhone_number_error] = useState('');
    const [email_error, setEmail_error] = useState('');
    const [match_error, setMatch_error] = useState('');
    const [exist_error, setExist_error] = useState('');

    const [rest_name_error, setRest_name_error] = useState('');
    const [rest_bio_error, setRest_bio_error] = useState('');
    const [rest_phone_error, setRest_phone_error] = useState('');
    const [rest_address_error, setRest_address_error] = useState('');

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault()
        
        const user = { first_name, last_name, username, email, phone_number, password1, password2, 
            rest_name, rest_bio, rest_phone, rest_address, rest_logo, rest_cover, pfp_url, cover_url }
        
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
            setUsername_error('')
            username_set = true
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
            setPassword1_error('')
        }            
        if (password1 !== password2) {
            setMatch_error('Passwords do not match')
        }

        if (!rest_name) {
            setRest_name_error('This field is required')
        } else {
            setRest_name_error('')
        }
        if (!rest_bio) {
            setRest_bio_error('This field is required')
        } else {
            setRest_bio_error('')
        }
        if (!rest_phone) {
            setRest_phone_error('This field is required')
        } else {
            setRest_phone_error('')
        }
        if (!rest_address) {
            setRest_address_error('This field is required')
        } else {
            setRest_address_error('')
        }

        if (username_set) {fetch('http://localhost:8000/users/register/owner/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)})
            .then(response => response.json())
            .then(json => {
                if (json['error'] === 1) {
                    // setUsername_error(json['username_error'])
                    // setPassword1_error(json['password1_error'])
                    // setPassword2_error(json['password2_error'])
                    // setFirst_name_error(json['first_name_error'])
                    // setLast_name_error(json['last_name_error'])
                    // setPhone_number_error(json['phone_number_error'])
                    // setEmail_error(json['email_error'])
                    // setMatch_error(json['match_error'])
                    setExist_error(json['exist_error'])

                    setRest_name_error(json['rest_name_error'])
                    setRest_bio_error(json['rest_bio_error'])
                    setRest_phone_error(json['rest_phone_error'])
                    setRest_address_error(json['rest_address_error'])
                    console.log(json)
                }
                else {
                    navigate('/users/login')
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
                                <h1 className="mb-4">Restaurant Sign Up</h1>
                                <h4 className="mb-2">Owner Information</h4>
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
                                <div className="mb-3" id="signupEmail">
                                    <label htmlFor="userEmail" className="form-label">Email address</label><br/>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control-lg" id="userEmail" aria-describedby="emailHelp"/>
                                    {email_error && <div className="error_message"> {email_error} </div>}
                                </div>
                                <div className="mb-3" id="signupPhoneNumber">
                                    <label htmlFor="userPhoneNumber" className="form-label">Phone Number</label><br/>
                                    <input value={phone_number} onChange={(e) => setPhonenumber(e.target.value)} type="text" className="form-control-lg" id="userPhoneNumber"/>
                                    {phone_number_error && <div className="error_message"> {phone_number_error} </div>}
                                </div>
                                <div className="mb-3" id="signupPfp">
                                    <label htmlFor="userPfp" className="form-label">User Profile Picture URL</label><br/>
                                    <input value={pfp_url} onChange={(e) => setUserPfp(e.target.value)} type="text" className="form-control-lg" id="userRestaurantLogo"/>
                                </div>
                                <div className="mb-3" id="signupCover">
                                    <label htmlFor="userCover" className="form-label">User Profile Cover URL</label><br/>
                                    <input value={cover_url} onChange={(e) => setUserCover(e.target.value)} type="text" className="form-control-lg" id="userRestaurantCover"/>
                                </div>
                                
                                <h4 className="mb-2">Restaurant Information</h4>
                                <div className="mb-3" id="signupRestaurantName">
                                    <label htmlFor="userRestaurantName" className="form-label">Restaurant Name</label><br/>
                                    <input value={rest_name} onChange={(e) => setRest_name(e.target.value)} type="text" className="form-control-lg" id="userRestaurantName"/>
                                    {rest_name_error && <div className="error_message"> {rest_name_error} </div>}
                                </div>
                                <div className="mb-3" id="signupRestaurantBio">
                                    <label htmlFor="userRestaurantBio" className="form-label">Restaurant Bio</label><br/>
                                    <input value={rest_bio} onChange={(e) => setRest_bio(e.target.value)} type="text" className="form-control-lg" id="userRestaurantBio"/>
                                    {rest_bio_error && <div className="error_message"> {rest_bio_error} </div>}
                                </div>
                                <div className="mb-3" id="signupRestaurantPhone">
                                    <label htmlFor="userRestaurantPhone" className="form-label">Restaurant Phone Number</label><br/>
                                    <input value={rest_phone} onChange={(e) => setRest_phone(e.target.value)} type="text" className="form-control-lg" id="userRestaurantPhone"/>
                                    {rest_phone_error && <div className="error_message"> {rest_phone_error} </div>}
                                </div>
                                <div className="mb-3" id="signupRestaurantAddress">
                                    <label htmlFor="userRestaurantAddress" className="form-label">Restaurant Address</label><br/>
                                    <input value={rest_address} onChange={(e) => setRest_address(e.target.value)} type="text" className="form-control-lg" id="userRestaurantAddress"/>
                                    {rest_address_error && <div className="error_message"> {rest_address_error} </div>}
                                </div>
                                <div className="mb-3" id="signupRestaurantLogo">
                                    <label htmlFor="userRestaurantLogo" className="form-label">Restaurant Logo URL</label><br/>
                                    <input value={rest_logo} onChange={(e) => setRest_logo(e.target.value)} type="text" className="form-control-lg" id="userRestaurantLogo"/>
                                </div>
                                <div className="mb-3" id="signupRestaurantCover">
                                    <label htmlFor="userRestaurantCover" className="form-label">Restaurant Cover URL</label><br/>
                                    <input value={rest_cover} onChange={(e) => setRest_cover(e.target.value)} type="text" className="form-control-lg" id="userRestaurantCover"/>
                                </div>
                                <div className="mb-3" id="signupPassword">
                                    <label htmlFor="userPassword" className="form-label">Password</label><br/>
                                    <input value={password1} onChange={(e) => setPassword1(e.target.value)} type="password" className="form-control-lg" id="userPassword"/>
                                    {password1_error && <div className="error_message"> {password1_error} </div>}
                                </div>
                                <div className="mb-3" id="signupConfirmPassword">
                                    <label htmlFor="userConfirmPassword" className="form-label">Confirm Password</label><br/>
                                    <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" className="form-control-lg" id="userConfirmPassword"/>
                                    {password2_error && <div className="error_message"> {password2_error} </div>}
                                    {match_error && <div className="error_message"> {match_error} </div>}
                                </div>
                                <div className="mb-3 form-check" id="signupAcceptAgreement">
                                    <input type="checkbox" className="form-check-input" id="userAgreement"/>
                                    <label htmlFor="userAgreement" className="form-label">I accept the terms and conditions before signing up.</label>
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

export default RestaurantSignUp