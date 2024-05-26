import './App.css';
import React from 'react';
import Register from './components/register/register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/login';
import Sellerdashboard from './components/seller/seller';
import CardDetails from './components/card/cardDetails';
import Buyerdashboard from './components/buyer/buyer';
import Home from './components/Home';

function App() { 
  return (
    <div className="App">
       <div className='rentify'>RENTIFY</div>
          <BrowserRouter>
            <Routes>
              <Route  exact element={<Home/>} path='/'/>
                <Route  exact element={<Register/>} path='/register'/>
                <Route  exact element={<Login/>} path='/login'/>
                <Route  exact element={<Sellerdashboard/>} path='/Sellerdashboard/:userid'/>
                <Route  exact element={<CardDetails/>} path='/carddetails/:userid'/>
                <Route  exact element={<Buyerdashboard/>} path='/buyerdashboard/:userid'/>
            </Routes>
          </BrowserRouter>
      
    </div>
  );
}

export default App;
