import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import {auth,db } from "../config/Config.js"
import { NavLink,useNavigate } from "react-router-dom";



const Login2 = () => {
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
    
    <div className='container'>
<br/><br/>
<h1>Login</h1>
<hr/>
<form className='form-group' onSubmit={handleSubmit}>


<label>Email</label>
<input type='email' className='form-control' required 
name='email' onChange={(events)=>{
  setValues((prev)=>({...prev,email:events.target.value}))
}}
></input>

<label>password</label>
<input type='password' className='form-control' required name='password'
 onChange={(events)=>{
  setValues((prev)=>({...prev,password:events.target.value}))
}}></input>
<br/>

<div className='btn-box'></div>
<span>Create an account</span>
<Link to="/signup2">Here</Link>
<button type='submit' className='btn btn-success btn-md'>submit</button></form>
   </div>
    </>
  )
}

export default Login2