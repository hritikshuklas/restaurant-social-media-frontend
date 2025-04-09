import {createContext} from "react";

export const BlogContext = createContext({
    update: 0,
    setUpdate: () => {}
})