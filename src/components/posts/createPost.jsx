import React, { Component } from 'react'
import Joi  from 'joi-browser';
import "../../assets/css/createposts.css"
import {toast , ToastContainer} from "react-toastify"
import * as postService from "../../services/postService"
import {validate , validateProperty , getSpinner ,renderErrorMessage} from "../common/formElements"

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:{}, 
          error:{},
          isdisabled:false,
          loading: false
        }
    }
    schema= {
      text: Joi.string().required().min(10).label("Text")    
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
    onCreate = (e)=>{
        const { data} = this.state
       e.preventDefault()
       this.setState({isdisabled: true , loading: true})
       const errors = validate(data , this.schema)
       this.setState({error : errors || {} })
       if(errors) {
          this.setState({loading : false , isdisabled: false})
          return;
       }
       postService.createPost(data.text).then(result=>{
           toast.success("Post Created Successfully!")
           this.setState({ loading: false })
           setTimeout(()=>window.location="/viewPosts" , 2000)
       }).catch(error=>{
           toast.error(error.message)
           if(error.response.status === 401){
             toast.info("Token Expired , Login Again")
             localStorage.removeItem("token")
             setTimeout(() => window.location="/" , 3000);
             this.setState({loading: false , isdisabled : false})
            }
       })
    }
    render() {
        const {isdisabled , loading , error} = this.state
        return ( 
            <React.Fragment>
              <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick  pauseOnFocusLoss pauseOnHover />
                <div className="custom-container">
                  <div className="inner-box">

                      <h2> Create Post </h2>
                    <form className="custom-form">
                      <div className="form-group">
                         <label > Text </label>
                         <input type ="text" className="form-control" name="text" onChange={this.handleChange}  disabled={isdisabled}/>
                         {renderErrorMessage("text" , error)}
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
 
export default CreatePost;