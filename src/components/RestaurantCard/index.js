import {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
 
const RestaurantCard = (props) => {

    require("./style.css")
    return <>
    <Link to={`/restaurant/${props.id}/info`} className="link-primary">
            <Card>
            <Card.Img style={{backgroundImage: 'url(' + props.backgroundImg + ')'}} />
            <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
            {props.address}
            </Card.Text>
            <Card.Text>
            <small className="text-muted">{props.num_followers} followers</small>
            </Card.Text>

            </Card.Body>
        </Card>
    </Link>
    </>

}

export default RestaurantCard