import React, { useEffect, useState, useContext } from 'react';
import { Row, Button } from 'react-bootstrap';
import { CommentContext } from '../../contexts/CommentContext';
import AddComment from '../AddComment';
import Comment from '../Comment'
import { UserContext } from '../../contexts/UserContext'
import { RestaurantContext } from '../../contexts/RestaurantContext';

const CommentPage = (props) => {
    const { token } = useContext(UserContext)

    const [comments, setComments] = useState([])
    const [count, setCount] = useState(0)
    const [next, setNext] = useState(`http://localhost:8000/restaurants/${props.rest_id}/comments/?offset=0`)
    const [update, setUpdate] = useState(0)

    const { restaurantUpdated, setRestaurantUpdated } = useContext(RestaurantContext)

    require("./style.css")


    useEffect(() => {
        setComments([])
        setNext(`http://localhost:8000/restaurants/${props.rest_id}/comments/?offset=0`)
        setCount(count - count)
    }, [update])
    
    useEffect(() => {
        fetch(next,
        {
            headers: { 
                'Authorization': `Bearer ${token}`,
            }
        },)
            .then(response => response.json())
            .then(json => {
                setComments(comments.concat(json.results))
                setNext(json.next)
            })
        
    }, [count, restaurantUpdated])

    let getNewPage = (e) => {
        if (next !== null){
            setCount(count + 1)
        }
    }

    return <>
    <CommentContext.Provider value={{update, setUpdate}}>
    
    <div id="comment-scroll-listener">
        <div id="comment-container" >
            <Row>
                <h4>Comments</h4>
                <AddComment rest_id={props.rest_id}/>
                {comments.map(post => (
                    <>
                    <Comment
                    id = {post.comment_id}
                    name = {post.name}
                    content = {post.content}
                    date= {new Date(post.comment_date).toDateString()}
                    username = {post.user_full_name}
                    userpfp = {post.user_pfp}
                    />
                    </>
                ))}
            </Row>
                {(next !== null) && <Row><Button onClick={getNewPage}>View More</Button></Row>}
        </div>
    </div>
    </CommentContext.Provider>
    </>
}
export default CommentPage;

    

