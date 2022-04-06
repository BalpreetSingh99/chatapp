import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Main from './components/Main';
export default function App() {
  return (
    <div>
      
        <div>
          <Router>
            <Routes>
            <Route path='/main' element={<Main />} />
            <Route path='/' element={<Login/>} />
            </Routes>
            
          </Router>
        </div>
        <div>
          
        </div>
      
    </div>
  );
}
