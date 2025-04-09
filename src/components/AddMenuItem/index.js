import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { MenuContext } from '../../contexts/MenuContext';
import { UserContext } from '../../contexts/UserContext';
import "./style.css";
const AddMenuItem = (props) => {
    require("./style.css")



    const [name, setName] = useState("");
    const [nameNotif, setNameNotif] = useState("");
    const [price, setPrice] = useState("");
    const [priceNotif, setPriceNotif] = useState("");
    const [content, setContent] = useState("");
    const [contentNotif, setContentNotif] = useState("");
    const [picture, setPicture] = useState("");

    const {update} = useContext(MenuContext);
    const {setUpdate} = useContext(MenuContext);

    const { token } = useContext(UserContext)
    
    function validateName(){
        if (name.length !== 0){
            setNameNotif("");
            return true;
        }
        else{
            setNameNotif("Name is invalid");
            return false;
        }
    }

    function validatePrice(){
        if (price.length !== 0 && !isNaN(price)){
            setPriceNotif("");
            return true;
        }
        else{
            setPriceNotif("Price is invalid");
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

    let submitNewItem = (e) => {
        e.preventDefault();
        var error = false;

        if (!validateName()){
            error = true;
        }
        if (!validatePrice()){
            error = true;
        }
        if (!validateContent()){
            error = true;
        }
        if (!error){
            let req = fetch(
                `http://localhost:8000/restaurants/${props.rest_id}/menu/`, 
                {
                    method: "POST",
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(
                        {
                            name: name,
                            price: price,
                            content: content,
                            picture: picture,
                        } 
                    )
                }
            )
            req.then(() => (setUpdate(1)))
        }
    };
    return <>
        <Form onSubmit={submitNewItem}>
            <Form.Group className="mb-3" controlId="formName">
                <p className="notification" id="name_notification">{nameNotif}</p>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Item Name" onChange={(val) => setName(val.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
                <p className="notification" id="price_notification"> {priceNotif} </p>
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Enter item price" onChange={(val) => setPrice(val.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <p className="notification" id="content_notification"> {contentNotif} </p>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter item description" onChange={(val) => setContent(val.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImageURL">
                <Form.Label>Picture URL</Form.Label>
                <Form.Control type="text" placeholder="Enter item image URL" onChange={(val) => setPicture(val.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}
export default AddMenuItem;