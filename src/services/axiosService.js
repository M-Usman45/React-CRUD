import axios from "axios"
 
export const authenticatedInstence = axios.create({
    baseURL : process.env.REACT_APP_URL,
    headers: {
        common: {
            AUTHORIZATION : localStorage.getItem("token")
        }
    }
}) 


export const instence = axios.create({
    baseURL : process.env.REACT_APP_URL
}) 