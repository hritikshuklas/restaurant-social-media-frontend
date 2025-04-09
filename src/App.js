import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

import Feed from "./components/Feed"
import Index from "./components/Index"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import UserSignUp from './components/UserSignUp';
import UserLogin from './components/UserLogin';
import RestaurantSignUp from './components/RestaurantSignUp';
import RestaurantPage from './components/RestaurantPage';
import { UserContext } from "./contexts/UserContext";
import { RestaurantContext } from "./contexts/RestaurantContext";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(0)
  const [user, setUser] = useState({})
  const [restaurantUpdated, setRestaurantUpdated ] = useState(0)
  const [restaurantInfo, setRestaurantInfo ] = useState({})
  

  return (
    <UserContext.Provider value={{token, setToken, user, setUser}}>
      <RestaurantContext.Provider value={{restaurantUpdated, setRestaurantUpdated, restaurantInfo, setRestaurantInfo}}>
      <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/users/login/" element={<UserLogin />} />
              <Route path="/users/register/customer/" element={<UserSignUp />} />
              <Route path="/users/register/owner/" element={<RestaurantSignUp />} />
              <Route path="/users/feed/" element={<Feed />} />
              <Route path="/" element={<Index />} />
              <Route path="/restaurant/:pk/info/" element={<RestaurantPage />} />
            </Routes>
            <Footer />
      </BrowserRouter>
      </RestaurantContext.Provider>
    </UserContext.Provider>
  )
}

export default App;