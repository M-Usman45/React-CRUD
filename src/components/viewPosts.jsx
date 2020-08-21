import React, { Component } from 'react'
import moment from "moment"
import jwtDecode from "jwt-decode"
import "../viewPosts.css"
import ReactPaginate from "react-paginate"
import * as postService from "../services/postService"
import * as authService from "../services/authService"
import { toast , ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom'

class ViewPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts:[],
      offset: 0 ,
      currentPage: 0,
      perPage: 10,
      pageCount: 0 ,
      paginateData: [] 
    }
  }
  componentDidMount() {
    this.getPosts()
  }
  getPosts = ()=>{
    postService.getAllPosts()
      .then(res=>{
        this.setState({posts: res.data})
        this.paginate(res.data)
      })
      .catch(error=>toast.error(error))
  }
  paginate=(data)=>{
    const {offset , perPage} = this.state
    const slice =data.slice(offset , offset + perPage)
    this.setState({pageCount : Math.ceil(data.length / perPage) , paginateData : slice })
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
        currentPage: selectedPage,
        offset: offset
    } , ()=>this.paginate(this.state.posts));
  };
  handleDelete = (id)=>{
    const orignalPosts = this.state.posts
    const filteredPosts = this.state.posts.filter(val=>val._id !== id)
    postService.deletePost(id)
      .then(result=>{
        toast.success("Post deleted Successfully! ")
        this.setState({posts: filteredPosts})
        this.paginate(filteredPosts)
      })
      .catch(err=>{
        this.setState({paginateData : orignalPosts})
        toast.error(err.message)
      })
  }
  getDeleteModel =()=>{
    return( 
       <div id="myModal" className="modal fade" role="dialog">
         <div className="modal-dialog">
           <div className="modal-content">
             <div className="modal-header">
              <h4 className="modal-title">Modal Header</h4>
           </div>
           <div className="modal-body">
             <p>Some text in the modal.</p>
           </div>
           <div className="modal-footer">
             <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
           </div>
         </div>
       </div>
      </div>
     ) }
     getDeleteModel =(id)=>{
       return (
         <div id="myModal" className="modal fade " role="dialog">
           <div className="modal-dialog modal-dialog-centered	">
             <div className="modal-content p-4">
               <div className="modal-body">
                 <h5>Are you sure?</h5>
               </div>
               <div className="custom-btn-container">
                 <button type="button" className="btn btn-primary col-2 custom-btn" data-dismiss="modal"> No </button>
                 <button type="button" className="btn btn-danger col-2" data-dismiss="modal" onClick={()=> this.handleDelete(id)}> Yes </button>
               </div>
             </div>
           </div>
         </div>
       )}
     getPostDetails=(data)=>{
       return <div> 
          <Link to= { { pathname : "/viewPostDetails" , state: {id : data._id } }} >
            <p> {data.text} </p>
          </Link>
        </div>

     }  
  render() { 
    const jwt = jwtDecode(authService.getjwt())
    const {paginateData} = this.state
    if(paginateData.length === 0)  return <div className="spinner-container">
         <div className="spinner-border text-dark my-custom-spinner" role="status"  > </div> 
       </div>
    return (
      <React.Fragment>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick  pauseOnFocusLoss pauseOnHover />
          <div className="post-container">
            <div className="post-inner-box ">
       <table className="table table-bordered table-striped ">
         <thead> 
           <tr>
              <th> Text </th> 
              <th> User </th> 
              <th> Date </th>
              <th> Actions </th>
            </tr>
         </thead>
         <tbody>
         {paginateData.map(value=>{
            return <tr key={value._id}> 
               <td> {this.getPostDetails(value)} </td>
               <td> {value.user} </td>
               <td> {moment(value.date).format("DD/MM/YYYY")  } </td>
               <td> 
                 <button 
                   className="btn btn-danger"
                   data-toggle="modal" 
                   data-target="#myModal"
                   disabled={value.user !== jwt.id  } 
                 > 
                   Delete 
                 </button>
                 {this.getDeleteModel(value._id)}
               </td>  
            </tr>
          }) }
         </tbody>
       </table>
       <ReactPaginate
         previousLabel={"prev"}
         nextLabel={"next"} 
         breakLabel={"..."}
         breakClassName={"break-me"}
         pageCount={this.state.pageCount}
         marginPagesDisplayed={2}
         pageRangeDisplayed={5}
         onPageChange={this.handlePageClick}
         containerClassName={"pagination"}
         subContainerClassName={"pages pagination"}
         activeClassName={"active"}/>
</div>
</div>
           </React.Fragment>
     ); }
}
 
export default ViewPosts;