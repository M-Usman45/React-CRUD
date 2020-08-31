import React, { Component } from 'react'
import {toast } from "react-toastify"
import {validate , validateProperty , getSpinner ,renderErrorMessage} from "./formElements"
import * as authService from "../../services/authService"
import Joi  from 'joi-browser';
import "../../assets/css/createProfile.css"
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data:{skills:[]}, 
      error:{},
      isdisabled:false,
      loading: false
    }
  }
  schema={
    handle: Joi.string().required().label("Handle"),
    status: Joi.string().required().label("Status"),
    skills: Joi.array().items( Joi.string().required() ).label("Skills")
  }
  handleChange = event =>{
    const {name , value} = event.target
    const {data , error} = this.state
    const errorMessage = validateProperty(event.target , this.schema)
    if(errorMessage)  
      error[name] = errorMessage ;
    else delete error[name]
      data[name] = value
      this.setState({data , error})
  }
  handleCheckbox=event=>{
    const {value } = event.target
    const {data , error} = this.state
    const copy={...data}
    const exist = copy.skills.find( (val , i ,array)=> {
      if(val === value)
      {
        array.splice(i,1)
        return true
      }  
      return false })
    if(!exist) copy.skills.push(value)
    const target = {
      name: "skills",
      value: copy.skills
    }
    const errorMessage = validateProperty(target , this.schema)
    if(errorMessage) error["skills"] = errorMessage 
    else delete error["skills"]
    data["skills"] = copy.skills
    this.setState({data , error})
  }
  onCreate=(e)=>{
    e.preventDefault()
    const {data } = this.state
    this.setState({isdisabled: true , loading: true})
    const errors = validate(data , this.schema)
    this.setState({error : errors || {}})
      if(errors){
        this.setState({isdisabled: false , loading: false})
        return ;
      }
      authService.createProfile(data.handle , data.status , data.skills.join())
        .then(result=>{console.log(result)
          toast.success("Post created successfully")
          this.setState({loading : false})
          this.props.history.push({pathname: "/createProfile" , state : {}})
        })
        .catch(err=>{
          toast.error(err.message)
          if(err.response.status === 401){
            toast.info("Token Expired , Login Again")
            localStorage.removeItem("token")
            this.props.history.push({pathname: "/"})
          }
          this.setState({isdisabled : false , loading: false})
        })
    }
    render() { 
      const {error , isdisabled ,loading} = this.state
      return (  
        <React.Fragment>
          <div className="custom-container">
            <div className="inner-box">
              <h2> Create Profile </h2>
              <form className="custom-form">
                <div className="form-group">
                  <label > Handle </label>
                  <input type ="text" className="form-control" name="handle" onChange={this.handleChange} disabled={isdisabled}/>
                    {renderErrorMessage("handle" , error)}
                  </div>
                  <div >
                    <label> Status </label> 
                    <div className="d-flex" >
                      <div >
                        <input type="radio" className="mx-2" id="active" name="status" value="active" onChange={this.handleChange} disabled={isdisabled} /> 
                        <label className="mx-2" htmlFor="active"> Active </label>
                      </div>
                      <div >
                        <input type="radio" className="mx-2" id="inactive" name="status" value="inactive" onChange={this.handleChange} disabled={isdisabled}/> 
                        <label className= "mx-2" htmlFor="inactive"> Inactive </label>
                      </div>
                    </div>
                      {renderErrorMessage("status" , error)}
                  </div>
                  <div className="form-group">
                    <label> Skills </label>
                    <div onChange={this.handleCheckbox} >
                      <div className="form-check">
                        <input type="checkbox" id="javascript" name="javascript" value="javascript" className="form-check-input" disabled={isdisabled} /> 
                        <label htmlFor="javascript" className="form-check-label" > Javascript </label>
                      </div>
                      <div className="form-check">  
                        <input type="checkbox" id="react" name="react" className="form-check-input" value="react" disabled={isdisabled} /> 
                        <label htmlFor="react" className="form-check-label"> React </label>
                      </div>
                      <div className="form-check">
                        <input type="checkbox" id="node" name="node" className="form-check-input" value="node" disabled={isdisabled}/> 
                        <label htmlFor="node" className="form-check-label"> Node </label>
                      </div>
                      <div className="form-check">  
                        <input type="checkbox" id="angular" name="angular" className="form-check-input" value="angular" disabled={isdisabled} /> 
                        <label htmlFor="angular" className="form-check-label"> Angular </label>
                      </div>
                    </div>
                      {renderErrorMessage("skills" , error)}
                  </div>
                  <button className="btn btn-secondary btn-block" onClick={this.onCreate} disabled={isdisabled}>
                    Create{ loading ? getSpinner  : "" } 
                  </button>
                </form>
              </div>
            </div>
        </React.Fragment>
      );
    }
}
 
export default CreateProfile;