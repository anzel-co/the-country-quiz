import { createContext } from "react";

export const AuthContext = createContext({
    name: null,
    getName: () => {},
    token: null,
    login: () => {},
    logout: () => {}
})