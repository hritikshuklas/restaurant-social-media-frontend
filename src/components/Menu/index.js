import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { MenuContext } from '../../contexts/MenuContext';
import AddMenuItem from '../AddMenuItem';
import MenuItem from '../MenuItem';
import { RestaurantContext } from '../../contexts/RestaurantContext';

const Menu = (props) => {
    require("./style.css")
    const [items, setItems] = useState([])
    const [update, setUpdate] = useState(0)
    const { restaurantUpdated, setRestaurantUpdated } = useContext(RestaurantContext)

    useEffect(() => {
        fetch(`http://localhost:8000/restaurants/${props.rest_id}/menu/`)
            .then(response => response.json())
            .then(json => {
                setItems(json)
                setRestaurantUpdated(false)
            })
    }, [update, restaurantUpdated])

    return <>
    <MenuContext.Provider value={{update, setUpdate}}>
        
        <div id="menu-listener">
            <div id="menu-container">
                <h4>Menu</h4>
                {items.map(item => (
                    <MenuItem
                    key = {item.id}
                    id = {item.id}
                    name = {item.name}
                    price = {item.price}
                    content = {item.content}
                    picture = {item.picture}
                    owner = {props.owner}
                    />
                ))}
                {props.owner && <Card>
                    <Card.Body>
                            <Card.Title>Add A New Item</Card.Title>
                            <AddMenuItem rest_id = {props.rest_id}/>
                    </Card.Body>
                        
                </Card>}
            </div>
        </div>
    </MenuContext.Provider>
    </>
}
export default Menu;
