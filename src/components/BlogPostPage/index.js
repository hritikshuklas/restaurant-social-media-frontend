import React, { useEffect, useState, useContext } from 'react';
import { Button, Row } from 'react-bootstrap';
import { BlogContext } from '../../contexts/BlogContext';
import { UserContext } from '../../contexts/UserContext';
import AddBlogPost from '../AddBlogPost';
import BlogPost from '../BlogPost';
import { RestaurantContext } from '../../contexts/RestaurantContext';

const BlogPostPage = (props) => {
    const [blogs, setBlogs] = useState([])
    const [count, setCount] = useState(0)
    const [next, setNext] = useState(`http://localhost:8000/restaurants/${props.rest_id}/blogposts/?offset=0`)
    const [update, setUpdate] = useState(0)
    
    const { restaurantUpdated, setRestaurantUpdated } = useContext(RestaurantContext)

    const { token } = useContext(UserContext)
    require("./style.css")

    
    useEffect(() => {
        setBlogs([])
        setNext(`http://localhost:8000/restaurants/${props.rest_id}/blogposts/?offset=0`)
        setCount(count + 1)
    }, [update])
    
    useEffect(() => {
        console.log("Fetching blogs")
        fetch(next,
        {
            headers: { 
                'Authorization': `Bearer ${token}`,
            }
        },)
            .then(response => response.json())
            .then(json => {
                setBlogs(blogs.concat(json.results))
                setNext(json.next)
            })
        console.log(update)
        setRestaurantUpdated(false)
        
    }, [count, setRestaurantUpdated])

    let getNewPage = (e) => {
        if (next !== null){
            setCount(count + 1)
        }
    }

    return <>
    <BlogContext.Provider value={{update, setUpdate}}>
    
    <div id="blogpost-scroll-listener">
        <div id="blogpost-container" >
            <Row>
                <h4>Posts</h4>
                {console.log(count)}
                {props.owner && <AddBlogPost rest_id={props.rest_id}/>}
                {blogs.map(post => (
                    <>
                    <BlogPost
                    key = {post.id}
                    id = {post.id}
                    title = {post.title}
                    content = {post.content}
                    datetime= {new Date(post.datetime).toDateString()}
                    restaurantName = {post.restaurant_name}
                    restaurantLogo = {post.restaurant_logo}
                    restaurantCover = {post.restaurant_cover}
                    likes = {post.likes}
                    liked = {post.liked}
                    owner = {props.owner}
                    />
                    </>
                ))}
            </Row>
            {(next !== null) && <Row><Button onClick={getNewPage}>View More</Button></Row>}
        </div>
    </div>
    </BlogContext.Provider>
    </>
}
export default BlogPostPage;

    

