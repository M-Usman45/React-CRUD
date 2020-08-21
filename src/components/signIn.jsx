import React, { Component } from 'react'
import Joi from "joi-browser"
import {toast , ToastContainer} from "react-toastify"
import * as authService from "../services/authService"
import {validate , validateProperty , renderErrorMessage, getSpinner } from "./formElements"
class SignIn extends Component {
  constructor(props) {
    super(props);
      this.state = {
          data:{},
          error:{},
          isdisabled:false,
          loading: false
        }
  }
  schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: Joi.string().required().min(6).label("Password"),
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
  onSignIn = (e)=>{
    e.preventDefault()
    const {data} = this.state
    const errors = validate(data , this.schema)
    this.setState({error: errors || {} })
    if(errors){  
      toast.error(`Validation Errors`)
      this.setState({loading : false , isdisabled: false})
      return
    }
    this.setState({loading: true , isdisabled: true})  
    authService.signIn(data.email , data.password).then(result=>{
        localStorage.setItem("token" ,result.data.token)
        toast.success("LoggedIn Successfully")
        this.setState({loading : false})
        setTimeout(()=>{ window.location="/"} , 1000)   
    }).catch(error=>{
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
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={this.handleChange} disabled={isdisabled}/>
                    {renderErrorMessage("email" , error )}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} disabled={isdisabled} />
                    {renderErrorMessage("password" , error ) }
                </div> <br/>
                <button className="btn btn-secondary btn-block" onClick={this.onSignIn} disabled={isdisabled}>
                  SignIn{ loading ? getSpinner  : "" }</button>
                  <p className="forgot-password text-right">
                    Not Account <a href="/signUp">sign up?</a>
                </p>
            </form>
 </div>
 </div>
      </React.Fragment>);
    }
}
 
export default SignIn;
