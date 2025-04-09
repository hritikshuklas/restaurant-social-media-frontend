import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BlogContext } from '../../contexts/BlogContext';
import { UserContext } from '../../contexts/UserContext';
import "./style.css";

const AddBlogPost = (props) => {
    require("./style.css")
    
    const [title, setTitle] = useState("");
    const [titleNotif, setTitleNotif] = useState("");
    const [content, setContent] = useState("");
    const [contentNotif, setContentNotif] = useState("");

    const { token } = useContext(UserContext)

    const {update, setUpdate} = useContext(BlogContext);
    
    function validateTitle(){
        if (title.length !== 0){
            setTitleNotif("");
            return true;
        }
        else{
            setTitleNotif("Name is invalid");
            return false;
        }
    }

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

    let submitNewBlog = (e) => {
        e.preventDefault();
        var error = false;
        if (!validateTitle()){
            error = true;
        }
        if (!validateContent()){
            error = true;
        }
        if (!error){
            let reqBody = JSON.stringify({ 
                title: title, 
                content: content
            })
            let req = fetch(
                `http://localhost:8000/restaurants/${props.rest_id}/blogposts/`, 
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
            req.then(() => setUpdate(update + 1));
        }
    };
    return <>
        <div className="post-card" id="add-blogpost">
            <h4>Create a new blogpost</h4>
            <Form onSubmit={submitNewBlog}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <p className="notification" id="title_notification">{titleNotif}</p>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Blog Title" onChange={(val) => setTitle(val.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBody">
                    <p className="notification" id="content_notification"> {contentNotif} </p>
                    <Form.Label>Body</Form.Label>
                    <Form.Control type="text" placeholder="Blog body" onChange={(val) => setContent(val.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    </>
}
export default AddBlogPost;