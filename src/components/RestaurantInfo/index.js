import React, { useState, useContext } from "react"
// import "./style.css"
import "../../assets/global.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from "../../contexts/UserContext"
import RestaurantEditInfo from "../RestaurantEditInfo"
import { RestaurantContext } from "../../contexts/RestaurantContext"
import { Button } from "react-bootstrap"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons"
 
function RestaurantInfo(props) {

    require("./style.css")
    const { token, user } = useContext(UserContext)
    const { restaurantUpdated, setRestaurantUpdated } = useContext(RestaurantContext)
    const [ following, setFollowing ] = useState(false)

    useEffect(() => {
        const id = user.id
        const rest_id = props.rest_pk

        console.log("ID", id)
        console.log("REST", rest_id)

        fetch('http://localhost:8000/users/isfollowing/', {
            method: 'POST',
            headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + token},
            body: JSON.stringify({ id, rest_id })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json === "Not Following"){
                setFollowing(false)
            }
            else {
                setFollowing(true)
            }
            setRestaurantUpdated(false)
        })
    }, [restaurantUpdated])



    const followHandler = () => {
        const id = user.id
        const rest_id = props.rest_pk

        fetch(`http://localhost:8000/restaurants/${props.rest_pk}/followers/`, {
            method: "POST",
            headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + token}
        })
        .then(response => response.json())
        .then(json => {
            console.log(JSON.stringify(json))
            
        })

        fetch('http://localhost:8000/users/isfollowing/', {
            method: 'POST',
            headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + token},
            body: JSON.stringify({ id, rest_id })
        })
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            setRestaurantUpdated(false)

            console.log(json)
            if (json === "Not Following"){
                setFollowing(true)
            }
            else {
                console.log("In there")
                setFollowing(false)
            }
            console.log("Following val " + following)
            setRestaurantUpdated(true)
        })
    }

    return (
        <div id="big-container">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#about">Information</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#menu-backdrop">Menu</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#blog-backdrop">Blog Posts</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#comment-backdrop">Comments</a>
                </li>
            </ul>

            <div className="big-container infocontainer">

                <div id="about">
                    <div id="about-content">
                        <h3>Information </h3>
                        
                        <div className="container">
                            <div className="row">
                            <div className="col info">
                                <FontAwesomeIcon icon={faLocationDot}/>    {props.restaurantInfo["address"]}
                            </div>
                            <div className="col info">
                            <FontAwesomeIcon icon={faHeart}/>     {props.restaurantInfo["num_followers"]}
                            </div>
                            <div className="col info">
                            <FontAwesomeIcon icon={faPhone}/>     {props.restaurantInfo["phone"]}
                            </div>
                            </div>
                        </div>
                        <h5>About Us:</h5><p>{props.restaurantInfo["bio"]}</p>
                        {props.owner === true && <RestaurantEditInfo restaurantInfo={props.restaurantInfo} rest_pk={props.rest_pk}/>}
                        {props.owner === false && <Button onClick={followHandler}>{following && "Unfollow Restaurant"}{!following && "Follow Restaurant"}</Button>}
                    </div>
                </div>

                <div className="img-container">
                    <img id="logo" alt="Logo" src={props.restaurantInfo["logo"]} />
                </div>

            </div>  
        </div>
    )
}

export default RestaurantInfo