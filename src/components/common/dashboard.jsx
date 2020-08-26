import React, { Component } from 'react'
import ViewPosts from '../posts/viewPosts';
import CreatePost from "../posts/createPost"
import CreateProfile from "../common/createProfile"
import ViewSinglePost from '../posts/viewSinglePost';
import ProtectedRoute from './protectedRoute';
import jwtDecode from "jwt-decode"
import {Route ,Switch ,BrowserRouter as Router, Link} from "react-router-dom"
class Dashboard extends Component {
  constructor(props) {
    super(props);
      this.state = {  }
  }
  onSignOut =()=>{
    localStorage.removeItem("token")
    window.location="/"
  }
  render() { 
    const token = localStorage.getItem("token")
    const jwt = jwtDecode(token);
    const UserName = jwt.name
    return (
      <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <span className="navbar-brand"> {UserName} </span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>  
      <div className="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link" to="/viewPosts">View All Posts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/createProfile">Create Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/createPost">Create New Post</Link>
          </li>
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" onClick={this.onSignOut}> SignOut </Link>
        </li>
        </ul>
        </div>
      </nav>
      <Router>
      <Switch>
        <Route path="/viewPosts" component={ViewPosts} />
        <Route path="/createProfile" component={CreateProfile} />
        <Route path="/createPost" component={CreatePost} />
        <Route path="/viewSinglePost" component={ViewSinglePost} />
        <Route path="/viewPostDetails" render ={props=> <ViewSinglePost {...props}/> } />
      </Switch>
      </Router>

    </React.Fragment>
    );
  }
}
 
export default Dashboard;