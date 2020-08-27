import {authenticatedInstence as axios , instence} from "./axiosService"
import jwtDecode from "jwt-decode"

export async function  signIn(email ,password){
 return  await instence.post(`users/login`, {email , password} )
}

export async function signUp(name , email , password){
   return await instence.post(`users/signup` , {name , email, password} )
}
export function getCurrentUser() {
   try {
     const jwt = localStorage.getItem("token");
     return jwtDecode(jwt);
   } catch (ex) {
     return null;
   }
 }

 export async function createProfile(handle , status , skills){
  return await axios.post(`/profile` , { handle , status , skills} )
}

 export function getjwt(){
   return localStorage.getItem("token")
 }
 
 