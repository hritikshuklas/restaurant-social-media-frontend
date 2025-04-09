import {createContext} from "react";

export const CommentContext = createContext({
    update: 0,
    setUpdate: () => {}
})