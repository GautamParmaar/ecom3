import React, { useState } from 'react'
import "./CSS/Login.css"
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from "../config/Config.js"
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',



  })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        toast.success('You are now logged in!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setRedirecting(true);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  // Use a conditional redirect to delay the navigation
  if (redirecting) {
    setTimeout(() => {
      navigate('/');
    }, 3000); // Adjust the delay time as needed
  }
  return (
    <>


      <div class="container my-4">
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12 login-key">
              <i class="fa fa-key" aria-hidden="true"></i>
            </div>
            <div class="col-lg-12 login-title">
              Login
            </div>

            <div class="col-lg-12 login-form">
              <div class="col-lg-12 login-form">
                <form>
                  <div class="form-group">
                    <label class="form-control-label">USERNAME</label>
                    <input type="text" class="form-control" name='email' onChange={(events) => {
                      setValues((prev) => ({ ...prev, email: events.target.value }))
                    }} />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input type="password" class="form-control" name='password'
                      onChange={(events) => {
                        setValues((prev) => ({ ...prev, password: events.target.value }))
                      }} i />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-text">
                      {/* <!-- Error Message --> */}
                    </div>
                    <div class="col-lg-6 login-btm login-button">
                      <button type="submit" onClick={handleSubmit} class="btn  btn-outline-primary">LOGIN</button>
                      <span className="new">
          Or <Link to='/signup'> <a className="signup" href="">Create new account</a></Link>
        </span>
                
                    </div>
                    
                   
                  </div>
                </form>
                
              </div>
              
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
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>  <ToastContainer
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
        />      </div>






    </>
  )
}

export default Login