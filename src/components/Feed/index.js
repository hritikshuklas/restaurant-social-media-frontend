import BlogPost from "../BlogPost";
import { useState, useEffect,  useContext} from "react";

import { UserContext } from "../../contexts/UserContext";

import ProfileCard from "../ProfileCard";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const Feed = () => {


    const {token} = useContext(UserContext);

    let nav = useNavigate()

    if(!token) {
        
        nav("/users/login")
    }

    require("./style.css")

    const [feed, setFeed] = useState([])
    
    const [url, setURL] = useState("http://localhost:8000/users/feed/")
    const [pageInfo, setPageInfo] = useState({prev: null, next: null})

    
    let auth = 'Bearer ' + token;
 
   const [searchParams, setSearchParams] = useSearchParams();

    let limit = searchParams.get('limit');
    let offset = searchParams.get('offset');
    useEffect(() => {

 

        let querystring = ""
       

        if(limit) querystring += `limit=${limit}&`;
        if(offset) querystring += `offset=${offset}`;
        
        let url = `http://localhost:8000/users/feed/?` + querystring;
        
        // Fetch the feed
        fetch(url, {
            method: "GET",
            headers: new Headers({
                'Authorization': auth
            })
        })
        .then(response => response.json())
        .then(json => {
            
            let prev_url = json['previous'] ? "/users/feed/" + json['previous'].substring(json['previous'].lastIndexOf('/') + 1) : null;
            let next_url = json['next'] ? "/users/feed/" + json['next'].substring(json['next'].lastIndexOf('/') + 1) : null
 
            setPageInfo({prev: prev_url, next:next_url })
           
            console.log(json);
            setFeed(json['results']) ;
       
        })

    }, [offset]);

    
    return <>
   
        <div className="feed-container">

        <ProfileCard />
        <h4> Your Feed </h4>
    
  
        {feed.map(post => (<BlogPost 
                            key={post.id} 
                            id ={post.id}
                            restaurant_id = {post.restaurant_id}
                            restaurantName = {post.restaurant_name}
                            restaurantLogo = {post.restaurant_logo}
                            restaurantCover = {post.restaurant_cover} 
                            title={post.title} 
                            content={post.content} 
                            datetime={new Date(post.datetime).toDateString()}
                            likes={post.likes}
                            liked={post.liked} />))}

        

        <div id="feed-links" className="mt-5 mb-5">
        
            {pageInfo['prev'] ? <Link to={pageInfo['prev']}  >Previous </Link> : null} 
            {pageInfo['next'] ? <Link to={pageInfo['next']}  >Next </Link> : null}

        </div>
      

        </div>


        </>

}


export default Feed;