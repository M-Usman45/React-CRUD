import React from 'react';
import {Route ,Switch ,BrowserRouter as Router, Redirect} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/signUp';
import SignIn from "./components/signIn"
import Dashboard from './components/dashboard';
import * as  authService from "./services/authService"
import './App.css';

function App() {
const isLogin = authService.getCurrentUser() ? true : false
if(isLogin) return <Dashboard />
  return (
    <Router>
      <div className="App">
              <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/signUp" component={SignUp} />
                <Redirect to="/"/>
              </Switch>
      </div>
    </Router>
  );
}

export default App;
