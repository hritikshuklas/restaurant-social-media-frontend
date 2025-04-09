//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import {ReactDOM} from 'react-dom'
//import {faHeart, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Card } from 'react-bootstrap';
 
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwMzAzMDM0LCJpYXQiOjE2NTAyMTY2MzQsImp0aSI6IjAxMzM0M2Q4MmViNTQwZGFhYzBlMDVmMTUyZTVlZDY3IiwidXNlcl9pZCI6M30.CkVCvsJ_-Meo2BnviInryxre9CoxYYLoIub8RfqP4eo"

const Comment = ({id, name, content, date, username, userpfp}) => {
    const [likes, setLikes] = useState(0)


    require("./style.css")

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
        <Card className="card-skeleton row mt-1 mb-1">
            <Row className="posted-comment no-gutters comment-canvas m-3">
                <img className="col-4 comment-picture" src={userpfp} alt={username} />
                <Col className="col-9 comment-body">
                    <Card.Body>
                        <Card.Title>{username}<span className="comment-timestamp">{date}</span></Card.Title>
                        <Card.Text>{content}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    </>
}

export default Comment;
