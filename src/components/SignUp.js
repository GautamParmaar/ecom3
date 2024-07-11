import React, { useState } from 'react'
import "./CSS/Signup.css"
import { Link } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import { setDoc,doc } from "firebase/firestore";
import {auth,db } from "../config/Config.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, { displayName: values.fullName });
        toast.success('Registration successful', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/login');
      })
      .catch((error) => {
        toast.error(error.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };


  return (
    <>
    
    <div className="login-container">
      <div className="login-box">
        <div className="login-title">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="login-row">
            <div className="login-textbox">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                required
                onChange={(e) => setValues({ ...values, fullName: e.target.value })}
              />
            </div>
          </div>
          <div className="login-row">
            <div className="login-textbox">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </div>
          </div>
          <div className="login-row">
            <div className="login-textbox">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>
          </div>
          <div className="login-row">
            <div className="login-textbox">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="login-button">Register</button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
    </>
  )
}

export default SignUp