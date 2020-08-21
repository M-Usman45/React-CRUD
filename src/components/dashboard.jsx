import React, { Component } from 'react'
import ViewPosts from './viewPosts';
import CreatePost from "./createPost"
import CreateProfile from "./createProfile"
import ViewSinglePost from './viewSinglePost';
import jwtDecode from "jwt-decode"
import {Route ,Switch ,BrowserRouter as Router} from "react-router-dom"
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
            <a className="nav-link" href="/">View All Posts</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/createProfile">Create Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/createPost">Create New Post</a>
          </li>
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href='/' onClick={this.onSignOut}> SignOut </a>
        </li>
        </ul>
        </div>
      </nav>
      <Router>
      <Switch>
        <Route exact path="/" component={ViewPosts} />
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