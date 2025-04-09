import React, { useEffect, useState, useContext } from 'react';
import "../../assets/global.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from "react-bootstrap"
import { UserContext } from "../../contexts/UserContext"
import { RestaurantContext } from "../../contexts/RestaurantContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquarePen} from '@fortawesome/free-solid-svg-icons'

function RestaurantEditInfo(props) {

    require("./style.css")

    const [name, setRest_name] = useState(props.restaurantInfo.name);
    const [bio, setRest_bio] = useState(props.restaurantInfo.bio);
    const [phone, setRest_phone] = useState(props.restaurantInfo.phone);
    const [address, setRest_address] = useState(props.restaurantInfo.address);

    const { token } = useContext(UserContext)
    const { setRestaurantUpdated } = useContext(RestaurantContext)

    const [cover, setRest_cover] = useState(props.restaurantInfo.cover);
    const [logo, setRest_logo] = useState(props.restaurantInfo.logo);

    const submitHandler = e => {
        e.preventDefault()

        const restaurant_instance = { name, bio, phone, address, logo, cover }

        console.log(restaurant_instance)

        fetch(`http://localhost:8000/restaurants/${props.rest_pk}/info/`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + token},
            body: JSON.stringify(restaurant_instance)})
        .then(response => response.json())
        .then(json => {
            setRestaurantUpdated(true)
        })
    }

    return (<>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formName">
                <p className="name" id="rest_name"></p>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Restaurant Name" onChange={(val) => setRest_name(val.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
                <p className="rest_bio" id="rest_bio"></p>
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder="Restaurant Bio" onChange={(val) => setRest_bio(val.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
                <p className="rest_bio" id="rest_bio"></p>
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" placeholder="Restaurant Phone" onChange={(val) => setRest_phone(val.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
                <p className="rest_bio" id="rest_bio"></p>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Restaurant Address" onChange={(val) => setRest_address(val.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
                <p className="rest_bio" id="rest_bio"></p>
                <Form.Label>Cover URL</Form.Label>
                <Form.Control type="text" placeholder="Restaurant Cover URL" onChange={(val) => setRest_cover(val.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
                <p className="rest_bio" id="rest_bio"></p>
                <Form.Label>Logo URL</Form.Label>
                <Form.Control type="text" placeholder="Restaurant Logo URL" onChange={(val) => setRest_logo(val.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faSquarePen}/> Edit Information
            </Button>
        </Form>
    </>)
}

export default RestaurantEditInfo