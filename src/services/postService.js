import {axiosInstence as axios} from "./axiosService"

export async function getAllPosts(){
    return axios.get(`posts`)
}

export async function createPost(text){
    return await axios.post(`posts` , {text})
}

export async function deletePost(id){
    return await axios.delete(`posts/${id}`)     
}
 
export async function getSinglePost(id){
    return await axios.get(`posts/${id}`)     
}
