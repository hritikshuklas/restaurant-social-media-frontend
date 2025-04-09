import RestaurantCard from "../RestaurantCard";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import { Link, useSearchParams , useNavigate} from "react-router-dom";
 

const Index = () => {


    require("./style.css");

    let navigate = useNavigate(); 

    const {token} = useContext(UserContext);
    let auth = 'Bearer ' + token;

    if(!token) {
        
        navigate("/users/login")
    }


    const [result, setResult] = useState({showing: 1, total: 5, restaurants: []})
    const [query, setQuery] = useState({search:'', type: 'name'})
    const [pageInfo, setPageInfo] = useState({prev: null, next: null})
    
   
 
   

    const [searchParams, setSearchParams] = useSearchParams();

    let limit = searchParams.get('limit');
    let offset = searchParams.get('offset');

    // If query changes, reset offset back to 0
    useEffect(() => {offset = 0}, [query])

  
    useEffect(() => {

    console.log(query)

       let querystring = `?q=${query.search}&type=${query.type}`;
       

       if(limit) querystring += `&limit=${limit}`;
       if(offset) querystring += `&offset=${offset}`;
       
       let url = `http://localhost:8000/users/index/` + querystring;
       
       
      

   
        fetch(url, {
            method: "GET",
            headers: new Headers({
                'Authorization': auth
            }),
        
        })
        .then(response => response.json())
        .then(json => {
            let prev_url = json['previous'] ? "/" + json['previous'].substring(json['previous'].lastIndexOf('/') + 1) : null;
            let next_url = json['next'] ? "/" + json['next'].substring(json['next'].lastIndexOf('/') + 1) : null
 
            setPageInfo({prev: prev_url, next:next_url })
            let restaurants = json['results'];
            setResult({showing:restaurants.length, total: json['count'], restaurants: restaurants})
            
            navigate("/" + querystring)

        })

    }, [query, offset]);

    
    return <>
        <div className="index-container">

        
         
        <div id="search-container" className="mt-5 mb-5">
            <h4>Search</h4>
            <div className="input-group mt-3 mb-3">
                <input type="text" onChange={(e) => setQuery({search: e.target.value, type: query.type})}
                className="form-control" placeholder="Search for Restuarants..." aria-label="search" aria-describedby="button-search" />
                
                <select name="type" onChange={(e) => setQuery({search: query.search, type: e.target.value})} id="type">
                    <option value="name">Name</option>
                    <option value="address">Address</option>
                    <option value="item">Menu Item</option>
                </select>

            </div>

        </div>

        
        <h4>All Restaurants</h4>
        <p><em>Showing {result['showing']} of {result['total']} results</em></p>

 
        {result['restaurants'].map(restaurant => (<RestaurantCard 
                                        key={restaurant.id}
                                        id={restaurant.id}
                                        name={restaurant.name} address={restaurant.address} 
                                        backgroundImg={restaurant.cover}
                                        num_followers={restaurant.num_followers}
                                        />))}


            <div id="links" className="mt-5 mb-5">
                
                {pageInfo['prev'] ? <Link to={pageInfo['prev']}  >Previous </Link> : null} 
                {pageInfo['next'] ? <Link to={pageInfo['next']}  >Next </Link> : null}

            </div>

        </div>


        </>

}


export default Index;