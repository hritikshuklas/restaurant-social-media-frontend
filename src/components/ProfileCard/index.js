import {useEffect, useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faSquarePen } from "@fortawesome/free-solid-svg-icons";
 
const ProfileCard = (props) => {
    
    require("./style.css")

    const [profile, setProfile] = useState({});
    const [editing, setEdit] = useState(false);
    const [errors, setErrors] = useState({});

    const {token} = useContext(UserContext);
    let auth = 'Bearer ' + token;
 
    const update = (field, value) => {
        let tmp = {...profile}
        tmp[field] = value;
        setProfile({...tmp});
    }

    const editProfile = () => {
        
        // If we finished editing, we want to send a request to submit our results
        if(editing) {
            let url = 'http://localhost:8000/users/profile/';
            
            

            // Fetch the profile
            fetch(url, {
             method: "PUT",
             headers: new Headers({
                 'Authorization': auth,
                 'Content-Type': 'application/json'
             }),
             body: JSON.stringify(profile)
             })
             .then(response => {
                if(!response.ok) {
                    response.json().then(json => {
                        setErrors(json)
                    })
                } else {
                    setErrors({})
                    setEdit(false)
                }
              
               
            })
          
           
        } else {
            setEdit(true);
        }
 
       
    
    }
    useEffect(() => {

       let url = 'http://localhost:8000/users/profile/';

       // Fetch the profile
       fetch(url, {
        method: "GET",
        headers: new Headers({
            'Authorization': auth
        })
        })
        .then(response => response.json())
        .then(json => {
            
             
            setProfile(json)
      
        })


    }, []);

     

    return <>

            <div id="profile-card" className="card p-0 mb-5">

            <div id="user-pfp-container" className="row m-0">
                
                <div id="pfp-bg" className="row" style={{backgroundImage: 'url(' + profile.cover_url + ')'}} ></div>

                
                
                    <div id="user-pfp" className="row" style={{backgroundImage: 'url(' + profile.pfp_url + ')'}}>
                    </div>
                    <div  className="row text-center mt-3 ">
                        <h3> <span id="name-container"> <span className="bg-primary"> {editing ? <input defaultValue={profile.username} onChange={event => update('username', event.target.value)} /> : profile.username} </span>  <sup><i className="fa-regular fa-pen-to-square"></i></sup> </span> </h3> 
                    </div>
                    <div className="row text-center mt-1">
                        <div className="col">
                            <i className="text-muted">{profile.first_name} {profile.last_name}</i>
                        </div>

                    
                    </div>
            

                

            </div>
           
            <div id="pfp-info" className="row p-3">
                <div className="row mt-4 ">
                    <div className="col-6">
                        <p><strong><i className="fa-solid fa-envelope"></i> First Name</strong> {editing ? <input onChange={event => update('first_name', event.target.value)} defaultValue={profile.first_name} /> : profile.first_name}<sup><i className="fa-regular fa-pen-to-square"></i></sup></p>
                    </div>
                    <div className="col-6">
                    <p><strong><i className="fa-solid fa-envelope"></i> Last Name</strong> {editing ? <input onChange={event => update('last_name', event.target.value)} defaultValue={profile.last_name} /> : profile.last_name}<sup><i className="fa-regular fa-pen-to-square"></i></sup></p>
                    
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-6">
                        <p><strong><i className="fa-solid fa-envelope"></i> Email</strong> {editing ? <input onChange={event => update('email', event.target.value)} defaultValue={profile.email} /> : profile.email}<sup><i className="fa-regular fa-pen-to-square"></i></sup></p>
                    </div>
                    <div className="col-6">
                        <p><strong><i className="fa-solid fa-phone"></i> Phone Number </strong> {editing ? <input onChange={event => update('phone_number', event.target.value)} defaultValue={profile.phone_number} /> : profile.phone_number} <sup><i className="fa-regular fa-pen-to-square"></i></sup></p>
                    </div>
                </div>

                {editing ? <>
                            <div className="row mt-4">
                            <div className="col-6">
                                <p><strong><i className="fa-solid fa-envelope"></i> Cover URL</strong> <input onChange={event => update('cover_url', event.target.value)} defaultValue={profile.cover_url} /> <sup><i className="fa-regular fa-pen-to-square"></i></sup></p>
                            </div>
                            <div className="col-6">
                                <p><strong><i className="fa-solid fa-phone"></i>Profile Picture URL </strong>  <input onChange={event => update('pfp_url', event.target.value)} defaultValue={profile.pfp_url} />  <sup><i className="fa-regular fa-pen-to-square"></i></sup></p>
                            </div>
                            </div> 
                            </>
                    : null}

                <div className="row mt-4 text-align-left">
                    <Button onClick={editProfile}>{editing ? <><FontAwesomeIcon icon={faFloppyDisk} /> Finish Editing</> : <><FontAwesomeIcon icon={faSquarePen} /> Edit Profile</>}</Button>
                </div>
                <div className="row">

                {
                Object.keys(errors).map((key, index) => ( 
                <p style={{color: 'red'}} key={index}> {key}: {errors[key][0]}</p> 
                ))
                }
          
                </div>
                
            </div>


            </div>

        </>

}

export default ProfileCard