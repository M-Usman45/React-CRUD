import axios from "axios"
import jwtDecode from "jwt-decode"

export async function  signIn(email ,password){
 return  await axios.post(process.env.REACT_APP_URL+"/users/login" , {email , password} )
}

export async function signUp(name , email , password){
   return await axios.post(process.env.REACT_APP_URL+"/users/signup" , {name , email, password} )
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
  return await axios.post(process.env.REACT_APP_URL+"/profile" , { handle , status , skills} )
}

 export function getjwt(){
   return localStorage.getItem("token")
 }
 
 