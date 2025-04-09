import {createContext} from "react";

export const RestaurantContext = createContext({
    restaurantUpdated: false,
    setRestaurantUpdated: () => {},
    restaurantInfo: false,
    setRestaurantInfo: () => {},
})