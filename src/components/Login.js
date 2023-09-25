import React,{useState} from 'react'
import "./CSS/Login.css"
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import {auth,db } from "../config/Config.js"
import { NavLink,useNavigate } from "react-router-dom";
function Login() {
  const navigate=useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',

  

  })

  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(values);
    signInWithEmailAndPassword(auth,values.email,values.password).then(async(res)=>{
     const user=res.user;
     console.log(res);
     
     console.log(user);
     navigate("/")
  
     
    }).catch(err=>console.log(err))
  }
  return (
   <>
<div class="main">
    <p class="sign" align="center">Sign in</p>
    <form class="form1">
      <input class="un " type="text" align="center"name='email' onChange={(events)=>{
  setValues((prev)=>({...prev,email:events.target.value}))
}} placeholder="Email"/>
      <input class="pass" type="password" align="center" placeholder="Password"  name='password'
 onChange={(events)=>{
  setValues((prev)=>({...prev,password:events.target.value}))
}}/>
      <a class="submit" type='submit' onClick={handleSubmit} align="center">Sign in</a>
      <p class="forgot" align="center"><a href="#">Forgot Password?</a></p>
          </form>  
      <p className='new'><Link to="/signup"> <a href='#'> Not Registered ? Create account</a> </Link>    </p>     
    </div>
   </>
  )
}

export default Login