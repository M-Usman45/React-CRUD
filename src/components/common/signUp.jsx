import React, { Component } from 'react'
import {toast , ToastContainer} from "react-toastify"
import * as authService from "../../services/authService"
import {renderErrorMessage , getSpinner ,validateProperty ,validate } from "./formElements"
import Joi from "joi-browser"

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      error:{},
      isdisabled:false,
      loading: false,
      }
  }
  schema = {
    name: Joi.string().required().label("Username"),
    email: Joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: Joi.string().required().min(6).label("Password") 
  }
  handleChange = event =>{
    const {name , value} = event.target
    const {data , error} = this.state
    const errorMessage = validateProperty(event.target , this.schema)
    if(errorMessage) { error[name] = errorMessage ; console.log(errorMessage) }
    else delete error[name]
    data[name] = value
    this.setState({data , error})
}
signUp = (e)=>{
  e.preventDefault()
  const {data} = this.state
  const errors = validate(data , this.schema)
  this.setState({ error: errors || {} })
  if(errors) {
    this.setState({loading : false , isdisabled: false})
    return;
  }
  this.setState({isdisabled: true , loading: true}) 
  authService.signUp(data.name , data.email , data.password)
    .then(result=>{
      localStorage.setItem("AUTHORIZATION" , result.data)        
      toast.success("SignUp Successfully")
      this.setState({loading: false })
      setTimeout(()=>window.location="/")
     })
    .catch(error=>{
      toast.error(error.message)
      this.setState({loading: false , isdisabled: false}) 
    })

}
  render() { 
    const {error , isdisabled , loading} = this.state
    return ( 
      <React.Fragment>
                <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick  pauseOnFocusLoss pauseOnHover />
        <div className="auth-wrapper">
            <div className="auth-inner">
           <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="First name" name="name" onChange={this.handleChange} disabled={isdisabled}/>
                    {renderErrorMessage("name" , error)}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange} disabled={isdisabled} />
                    {renderErrorMessage("email" , error)}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} disabled={isdisabled} />
                    {renderErrorMessage("password" , error)}
                </div>
                <button className="btn btn-secondary btn-block" onClick={this.signUp} disabled={isdisabled}>
                 Sign Up {loading ? getSpinner : ""}</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>
            </form>
            </div>
            </div>
      </React.Fragment>
    );
  }
}
 
export default SignUp;


