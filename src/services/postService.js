import axios from "axios"
import * as authService from "./authService"

axios.defaults.headers.common["AUTHORIZATION"] = authService.getjwt()

export async function getAllPosts(){
    return await axios.get(process.env.REACT_APP_URL+"/posts")
}

export async function createPost(text){
    return await axios.post(process.env.REACT_APP_URL+"/posts" , {text})
}

export async function deletePost(id){
    return await axios.delete(process.env.REACT_APP_URL+"/posts/"+id)     
}
 
export async function getSinglePost(id){
    return await axios.get(process.env.REACT_APP_URL+"/posts/"+id)     
}
