import { faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState, useContext } from "react"
import {DropdownButton, Dropdown, Button} from "react-bootstrap"
import { UserContext } from "../../contexts/UserContext"


const Notification = (props) => {

    const [notif, setNotif] = useState([])
    const [next, setNext] = useState('http://localhost:8000/users/notifications/')
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false)
    const user = useContext(UserContext)

    useEffect(() => {
        let auth = 'Bearer ' + user.token;
        fetch(
            next,
            {
                headers : { 
                'Authorization': auth,
                },
            }
        ).then(response => response.json())
        .then(json => {
            setNotif(notif.concat(json.results))
            setNext(json.next)
        })
    }, [count])

    const addPage = (e) => {
        e.stopPropagation()
        if (next !== null){
            setCount(count + 1)
        }
    }
    require("./style.css")
    return <>
            <DropdownButton align="end" id="notif-button" variant="primary" title={<FontAwesomeIcon icon={faBell}/>} show={show} onClick={()=>setShow(!show)}>
                {notif.map(item => (
                    <>
                    <Dropdown.Item href="#" className={"notif" + (item.read ? " read" : "")}><img className="notif-image" src={item.sender_pfp} alt={item.sender_name}/>{item.content} <span class="notif-date">{(new Date(item.datetime)).toLocaleDateString()}</span></Dropdown.Item>
                    </>
                ))}
                <Dropdown.Item href="#" onClick={addPage}>Older notifications</Dropdown.Item>
            </DropdownButton>
    </>
}

export default Notification;