import { useState , useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BlogContext } from '../../contexts/BlogContext';
import {faHeart, faTrashCan, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogPost = (props) => {

    require("./style.css")


    const [likesInfo, setLikesInfo] = useState({likes: props.likes, liked: props.liked});

    const {token} = useContext(UserContext);
    let auth = 'Bearer ' + token;
 
    const {update, setUpdate} = useContext(BlogContext);
   
    const like = () => {

        let url = 'http://localhost:8000/restaurants/blogposts/' + props.id + '/likes/';
     
        fetch(url, {
            method: "POST",
            headers: new Headers({
                'Authorization': auth
            })
        })
        .then(response => response.json())
        .then(json => {
    
           console.log(json)

        })
        
     
        setLikesInfo({likes: likesInfo.liked ? likesInfo.likes - 1 : likesInfo.likes + 1, liked: !likesInfo.liked })
        

         
    }

    const delPost = () => {
        let url = 'http://localhost:8000/restaurants/blogposts/' + props.id + '/';
        fetch(url, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': auth
            })
        }).then(() => setUpdate(update+1))
    }
 


    return <>
            <div className="post-card">
            
           
            <div className="row post-info g-0" style={{backgroundImage: 'url(' + props.restaurantCover +')'}}   >
                <div className="col-1 post-profile-pic" style={{backgroundImage: 'url(' + props.restaurantLogo +')'}}>
                </div>
                <div className="col-11 post-profile-name"><h6><span className="bg-primary">{props.restaurantName}</span></h6></div> 

            </div>

            <div className="row post-date">
                <p className="text-muted"><em>{props.datetime}</em></p>
            </div>

            <div className="row post-content g-0">

                <h5>{props.title}</h5>

                <p>{props.content}</p>
                        
            </div>

            <div className="row post-actions g-0 ">
                <div className="col"><button onClick={like}> <i className="fa-solid fa-heart"></i>
                {likesInfo.liked ? <><FontAwesomeIcon icon={faHeart}/> {likesInfo.likes}</> : <><FontAwesomeIcon icon={farHeart} /> {likesInfo.likes}</>}
                </button></div>                
                <div className="col">
                    <Link to={`/restaurant/${props.restaurant_id}/info`}><FontAwesomeIcon icon={faUpRightFromSquare} /> View Page </Link></div>
                {props.owner && <div className="col">
                    <Button variant="danger" onClick={delPost}><FontAwesomeIcon icon={faTrashCan}/> Delete</Button></div> }      
            </div>

        </div>
        </>

}

export default BlogPost;