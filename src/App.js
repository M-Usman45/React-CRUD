import React from 'react';
import {BrowserRouter as Router} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

import '../src/assets/css/App.css';
import MainRoutes from './components/common/mainRoutes';


function App() {
  return (
    <Router>
      <div className="App">
         <MainRoutes />
      </div>
    </Router>
  );
}

export default App;
