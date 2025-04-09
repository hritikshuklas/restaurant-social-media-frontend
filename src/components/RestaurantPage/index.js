import React, { useEffect, useState, useContext } from "react"
import { useParams } from 'react-router-dom'
// import "./style.css"
import "../../assets/global.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import RestaurantInfo from "../RestaurantInfo"
import { RestaurantContext } from "../../contexts/RestaurantContext"
import { UserContext } from "../../contexts/UserContext"
import Menu from "../Menu"
import BlogPostPage from "../BlogPostPage"
import CommentPage from "../CommentPage"

function RestaurantPage() {

    require("./style.css")

    const { restaurantUpdated, setRestaurantUpdated, restaurantInfo, setRestaurantInfo } = useContext(RestaurantContext)
    
    const params = useParams()
    const rest_pk = params['pk']
    
    const [ owner, setOwner ] = useState(false)
    const { user, token } = useContext(UserContext)

    useEffect(() => {
        fetch(`http://localhost:8000/restaurants/${rest_pk}/info/`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then(json => {
                setRestaurantInfo(json)
                setRestaurantUpdated(false)
                
                if ( json['owner'] == user['id'] && json['id'] == rest_pk) {
                    setOwner(true)
                }
                else {
                    setOwner(false)
                }
            })
            
    }, [restaurantUpdated, rest_pk])


    return (
        <>
            <div id="big-container">
                <div id="landing" style={{backgroundImage: "url(" + restaurantInfo['cover'] + ")"}}>
                    <div id="main-title">
                        <h1>{restaurantInfo["name"]}</h1>
                    </div>
                </div>
            </div>
            {Object.keys(restaurantInfo).length && <RestaurantInfo restaurantInfo={restaurantInfo} setRestaurantInfo={setRestaurantInfo} id={restaurantInfo['id']} rest_pk={rest_pk} owner={owner}/>}
            <div class="big-container">
                <div id="menu-backdrop">
                    <div id="main-title">
                        <h1>Menu</h1>
                    </div>
                </div>
            </div>
            <Menu rest_id={rest_pk} owner={owner} />
            <div class="big-container">
                <div id="blog-backdrop">
                    <div id="main-title">
                        <h1>Blog Posts</h1>
                    </div>
                </div>
            </div>
            <BlogPostPage rest_id={rest_pk} owner={owner}/>
            <div id="comment-backdrop">
                <div id="main-title">
                    <h1>Comments</h1>
                </div>
            </div>
            <CommentPage rest_id={rest_pk}/>
        </>
    )
}

export default RestaurantPage