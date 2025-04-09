import { useState, useContext } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { MenuContext } from '../../contexts/MenuContext';
import { UserContext } from '../../contexts/UserContext';
import { faFloppyDisk, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
const MenuItem = ({owner, id, name, price, content, picture}) => {

    require("./style.css")

    const [editing, setEdit] = useState(false)
    const [menu, editMenu] = useState(({name: name, price: price, content: content, picture:picture}))
    const [errors, setErrors] = useState({})

    const {token} = useContext(UserContext);
    const {update, setUpdate} = useContext(MenuContext);

    let auth = 'Bearer ' + token;

    const updateBody = (field, value) => {
        let tmp = {...menu}
        tmp[field] = value;
        editMenu({...tmp});
    }
    const editItem = () => {
        console.log(menu)
        if (editing){
            let url = 'http://localhost:8000/restaurants/menu/' + id + '/';
            
            console.log("Sending put request")
            console.log(menu)
            fetch(url, {
             method: "PUT",
             headers: new Headers({
                 'Authorization': auth,
                 'Content-Type': 'application/json'
             }),
             body: JSON.stringify(menu)
             })
             .then(response => {
                if(!response.ok) {
                    response.json().then(json => {
                        setErrors(json)
                    })
                } else {
                    setErrors({})
                    setEdit(false)
                    setUpdate(update + 1)
                }
              
               
            })
          
           
        } else {
            setEdit(true);
        }
    }


    return <>
        <Card key={id} className="mb-3">
            <Card.Img src={picture}></Card.Img>
            <Card.Body>
                <Card.Title>{editing ? <><b>Name</b><input onChange={event => updateBody('name', event.target.value)}  defaultValue={name}/></> : name}</Card.Title>
                <Card.Text>${editing ? <><b>Price</b><input onChange={event => updateBody('price', event.target.value)}  defaultValue={price}/></>: price}</Card.Text>
                <Card.Text>{editing ? <><b>Description</b><input onChange={event => updateBody('content', event.target.value)}  defaultValue={content}/></> : content}</Card.Text>
                {editing && <Card.Text><><b>Image URL</b><input onChange={event => updateBody('picture', event.target.value)}  defaultValue={picture}/></></Card.Text>}
            </Card.Body>
            <Row>

                {
                Object.keys(errors).map((key, index) => ( 
                <p style={{color: 'red'}} key={index}> {key}: {errors[key][0]}</p> 
                ))
                }
          
            </Row>
            {owner && <Button variant="warning" onClick={editItem}>{editing ? <><FontAwesomeIcon icon={faFloppyDisk} /> Save Changes</> : <><FontAwesomeIcon icon={faSquarePen} /> Edit Item</>}</Button>}
            
        </Card>
    </>
}

export default MenuItem;
