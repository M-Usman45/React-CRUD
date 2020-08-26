import axios from "axios"
 
export const axiosInstence = axios.create({
    baseURL : process.env.REACT_APP_URL,
    headers: {
        common: {
            AUTHORIZATION : localStorage.getItem("token")
        }
    }
}) 


