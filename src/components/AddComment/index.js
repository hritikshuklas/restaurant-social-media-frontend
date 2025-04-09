import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CommentContext } from '../../contexts/CommentContext';
import { UserContext } from '../../contexts/UserContext';
import "./style.css";

const AddComment = (props) => {
    require("./style.css")
    
    const [content, setContent] = useState("");
    const [contentNotif, setContentNotif] = useState("");;

    const {update} = useContext(CommentContext);
    const {setUpdate} = useContext(CommentContext);

    const { token } = useContext(UserContext)

    function validateContent(){
        if (content.length !== 0){
            setContentNotif("");
            return true;
        }
        else{
            setContentNotif("Description is invalid");
            return false;
        }
    }

    let submitNewComment = (e) => {
        e.preventDefault();
        var error = false;
        if (!validateContent()){
            error = true;
        }
        if (!error){
            let reqBody = JSON.stringify({ 
                content: content
            })
            let req = fetch(
                `http://localhost:8000/restaurants/${props.rest_id}/comments/`, 
                {
                    method: "POST",
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: reqBody
                }
            )
            req.then(() => setUpdate(1));
        }
    };
    return <>
        <div className="post-card" id="add-blogpost">
            <h4>Create a new comment</h4>
            <Form onSubmit={submitNewComment}>
                <Form.Group className="mb-3" controlId="formBody">
                    <p className="notification" id="content_notification"> {contentNotif} </p>
                    <Form.Control type="text" placeholder="Comment body" onChange={(val) => setContent(val.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faCircleArrowRight}/> Submit
                </Button>
            </Form>
        </div>
    </>
}
export default AddComment;