import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword} from 'firebase/auth';
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
  });

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
  };

  // Use a conditional redirect to delay the navigation
  if (redirecting) {
    setTimeout(() => {
      navigate('/');
    }, 3000); // Adjust the delay time as needed
  }
  return (
    <>


<div className="login-container">
      <div className="login-box">
        <div className="login-title">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="login-row">
            <div className="login-textbox">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
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
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, password: event.target.value }))
                }
              />
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
          <span className="new">
            Or <Link to='/signup' className="signup">Create new account</Link>
          </span>
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

export default Login