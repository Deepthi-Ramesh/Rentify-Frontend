import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import Register from './components/register/register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/login';
import Sellerdashboard from './components/seller/seller';
import CardDetails from './components/card/cardDetails';
import Buyerdashboard from './components/buyer/buyer';
//import { useNavigate } from "react-router-dom";

function App() {
  // const [isReloadTodos, setIsReloadTodos] = useState(true);
  // const [todo, settodo] = useState("");
  // const [todos,settodos]=useState('');
  // useEffect(() => {
  //   if(isReloadTodos) {
  //     getAllTodos();
  //     setIsReloadTodos(false);
  //   }
  // },[isReloadTodos]);

  // const submit = async() => {
  //   try {
  //       var sendTodo=todo;
  //       settodo('');
  //   if(sendTodo.length<=255 && sendTodo.length!=0){
  //     const response = await axios.post("HOST_URL/app", {
  //       todo:sendTodo
  //     })
  //     console.log(response);
  //   setIsReloadTodos(true);
  //   }
  //   else{
      
  //     alert("Todo cannot be too long and also cannot be empty");
  //   }
  
  //   } catch (error) {
  //       console.log(error);
  //   }
  
  //     }
  //     const deleteTodo = async(id) => {
  //       console.log(id)
  //       try {
  //         const response = await axios.post("HOST_URL/deleteTodo", {
  //           id:id
  //         })
  //         setIsReloadTodos(true);
  //       } catch (error) {
  //           console.log(error);
  //       }
  //         }
  //     const getAllTodos=async()=>{
  //       try{
  //         const response=await axios.get("HOST_URL/todos")
  //         settodos(response.data.data);
  //     }
  //     catch(error){
  //       console.log(error);
  //     }
  //   }
  //   const completedTodo = async(id) => {
  //     console.log("id : ", id);
  //     try {
  //       const response = await axios.put("HOST_URL/completedTodo", {
  //         id:id
  //       })
  //       setIsReloadTodos(true);
  //     } catch (error) {
  //         console.log(error);
  //     }
  //       }
  //const history = useNavigate()
  return (
    <div className="App">
   
         {/* <div className="header">
           <p className='logo'>RENTIFY</p>
           <div className='nav'>
            <p onClick={()=>{
            document.querySelector('.App').scrollIntoView({
              behavior: 'smooth'
            });
          }}>HOME</p>
            <p onClick={()=>{
            document.querySelector('.about').scrollIntoView({
              behavior: 'smooth'
            });
          }} >ABOUT</p>
            <p>CONTACT US</p>
           </div>
           <div className='buttons'>
            <button className='login'>LOG IN</button>
            <button className='register'>REGISTER</button>
           </div>
       </div>
       <div className='image-con'> 
           <img src='/rental.jpeg'  alt=""/>
       </div>
       <div className='about'>
        <p className='head'>About</p>
        <p className='content'>
        Rentify - Where Renting Meets Simplicity
 As the world recovers from the pandemic, daily life is gradually returning to normal. Schools, colleges, movie theaters, restaurants, and other establishments are operating at near-full capacity. Work-from-home arrangements have decreased as offices reopen, with many employees returning to their workplaces, often as immigrants in new cities.

This transition has led to a surge in demand for real estate. Rents have increased, making it more challenging to find rental properties, particularly in densely populated cities with numerous IT offices. To address this issue, a brokerage company is developing a platform called Rentify. This website aims to connect property owners with suitable tenants and help tenants find homes that meet their specific requirements. 
        </p>
       </div>
       <p className='explore'>Explore more ...</p>
       <button className='registerbig'>REGISTER</button> 
  
         <Register/>
       */}
       <div className='rentify'>RENTIFY</div>
       
       <BrowserRouter>
       <Routes>
        <Route  exact element={<Register/>} path='/'/>
        <Route  exact element={<Login/>} path='/login'/>
        <Route  exact element={<Sellerdashboard/>} path='/Sellerdashboard/:userid'/>
        <Route  exact element={<CardDetails/>} path='/carddetails/:userid'/>
        <Route  exact element={<Buyerdashboard/>} path='/buyerdashboard/:userid'/>
       </Routes>
       </BrowserRouter>
       {/* <Register/> */}
    </div>
  );
}

export default App;
