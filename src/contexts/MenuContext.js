import {createContext} from "react";

export const MenuContext = createContext({
    update: 0,
    setUpdate: () => {}
})