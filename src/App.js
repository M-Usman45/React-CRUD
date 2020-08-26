import React from 'react';
import {Route ,Switch ,BrowserRouter as Router, Redirect} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/common/signUp';
import SignIn from "./components/common/signIn"
import Dashboard from './components/common/dashboard';
import '../src/assets/css/App.css';
import ProtectedRoute from './components/common/protectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/signUp" component={SignUp} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <Redirect to="/"/>
              </Switch>
      </div>
    </Router>
  );
}

export default App;
