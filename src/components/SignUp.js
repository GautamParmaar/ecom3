import React, { useState } from 'react'
import "./CSS/Signup.css"
import { Link } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import { setDoc,doc } from "firebase/firestore";
import {auth,db } from "../config/Config.js"


function SignUp() {
  const navigate=useNavigate();
  const [userType, setUserType] = useState(''); // State to track the selected user type
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };


  // for backend
  const [values, setValues] = useState({
    email: '',
    pass: '',
    name :'',
    phone:'',
    select :'',
    GST:''

    // name: '',
    // number: ''

  }) 

  const [errorMsg,seterrorMsg]=useState('')

  const handleSubmit=(event)=>{
    event.preventDefault();
   
    console.log(values);
    createUserWithEmailAndPassword(auth,values.email,values.pass).then(async(res)=>{
     const user=res.user;
     await updateProfile(user,{
      displayName:values.name,
     
     })
     try {
      const docRef = await setDoc(doc(db, "users", user.uid), {
            uid:user.uid,
            name:user.displayName,
            email:user.email,
            phone:values.phone,
            GST:values.GST,
            registerAs :values.select
      });
      console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
     
    
     console.log(user.displayName);
  
     
   
     navigate("/")
    }).catch((err)=>{console.log(err)
    seterrorMsg(err.message)
    }
    
    )
  }


  return (
    <>
    
    <section className='sectionContainer' >
    <div class="container signupForm">
      
      
      
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-8 col-xl-6">
          <div class="row">
            <div class="col text-center">
              <h2>Register</h2>
              <p class="text-h3"> Registration on this platform is exclusively available to medical professionals and individuals in the retail or wholesale sector.</p>
            </div>
          </div>
          <div class="row align-items-center mt-0">
            <div class="col mt-0">
              <input type="text" name='name' class="form-control" placeholder="Your Name" required onChange={(events)=>{
  setValues((prev)=>({...prev,name:events.target.value}))
}} />
            </div>
          </div>
          <div class="row align-items-center mt-2">
            <div class="col">
              <input type="number" class="form-control" placeholder="Your Phone Number" name='phone' onChange={(events)=>{
  setValues((prev)=>({...prev,phone:events.target.value}))
}} required/>
            </div>
            <div class="col">
              <input type="email" class="form-control" placeholder="Your Email" name='email' onChange={(events)=>{
  setValues((prev)=>({...prev,email:events.target.value}))
}} required/>
            </div>
          </div>
          <div class="row align-items-center mt-2">
            <div class="col">
              <input type="password" name='pass' class="form-control"onChange={(events)=>{
  setValues((prev)=>({...prev,pass:events.target.value}))
}} placeholder="Password" required/>
            </div>
            <div class="col">
              <input type="password" class="form-control" placeholder="Confirm Password" required/>
            </div><br/>
            
            
          </div>
          
          
            <div class="row align-items-center mt-2">
            <h6>Business Type</h6>
            <div className='col'>
        <select id="brandFilter" name='select'  required onChange={(events)=>{
          setValues((prev)=>({...prev,select:events.target.value}))
        }}    >
                    <option value="retailer">Retailer/wholesaler</option>

          <option  value="Doctor">Doctor</option>
        </select>

        <div class="col mt-2">
              <input type="text" name='GST' disabled={values.select === 'Doctor'}  title="GST number is only required for Retailers/Wholesalers"  class="form-control" onChange={(events)=>{
  setValues((prev)=>({...prev,GST:events.target.value}))
}} placeholder="Your GST number" required/>
            </div>
      </div> <br/><br/>
          </div>
          <div class="row align-items-center">
          <Link to="/login">  <a to="/login">Already have an account </a></Link>

          </div>
          <div class="">
              <button type='submit' onClick={handleSubmit} class="btn btn-primary mt-2">Submit</button>

          </div>
      
          
          
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default SignUp