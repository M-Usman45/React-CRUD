import React from 'react';
import {BrowserRouter as Router} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"
import '../src/assets/css/App.css';
import MainRoutes from './components/common/mainRoutes';


function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick  pauseOnFocusLoss pauseOnHover />
         <MainRoutes />
      </div>
    </Router>
  );
}

export default App;
