import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import {ReactDOM} from 'react-dom'
import {faHeart, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-bootstrap';
import "./style.css";

let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwMzAzMDM0LCJpYXQiOjE2NTAyMTY2MzQsImp0aSI6IjAxMzM0M2Q4MmViNTQwZGFhYzBlMDVmMTUyZTVlZDY3IiwidXNlcl9pZCI6M30.CkVCvsJ_-Meo2BnviInryxre9CoxYYLoIub8RfqP4eo"

const BlogPost = ({id, title, content, date}) => {
    const [likes, setLikes] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:8000/restaurants/blogposts/${id}/likes/`,
                    {
                        headers: { 
                            'Authorization': `Bearer ${token}`,
                        }
                    },)
                    .then(response=>response.json())
                    .then(json => setLikes(json.count))
    }, [])
    return <>
        <div className="post-card" key={id}>
            <Row className="post-info g-0" style={{backgroundImage: "url(https://www.pluggedin.com/wp-content/uploads/2019/12/toy-story-3-1024x639.jpg)"}}>
                <Col className="col-1 post-profile-pic" style={{backgroundImage: "url(https://originalshawarma.ca/wp-content/uploads/2020/11/black.png)"}}></Col>
                <Col className="col-11 post-profile-name"><h6><span className="bg-primary">Restaurant</span></h6></Col> 
            </Row>

            <Row className="post-date">
                <p className="text-muted"><em>{date}</em></p>
            </Row>

            <div className="row post-content g-0">
                <h5>{title}</h5>
                <p>{content}</p>  
            </div>

            <Row className="post-actions g-0 ">
                <Col><FontAwesomeIcon icon={faHeart} /> {likes} </Col>                
                <Col><FontAwesomeIcon icon={faUpRightFromSquare} /> View Page </Col>         
            </Row>
        </div>
    </>
}

export default BlogPost;
