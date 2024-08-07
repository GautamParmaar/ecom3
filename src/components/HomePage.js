import React, { useEffect, useState } from 'react'
import "./CSS/Home.css"
import SignUp from './SignUp'
import CarouselProduct from './CarouselProduct'
import SmallNav from './SmallNav'
import Schemes from './Schemes'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../config/Config'
import { doc, setDoc } from 'firebase/firestore'
import Header from './Header'
import Features from './Features'
import About from './About'
import Testimonial from './Testimonial'



function HomePage({user}) {

  // for signup page 
  const navigate=useNavigate();
 
 


  // for backend
  const [values, setValues] = useState({
    email: '',
    pass: '',
    name :'',
    phone:'',
    select :'',
    GST:'',
    confirmPass:''

    // name: '',
    // number: ''

  }) 

  const [errorMsg,seterrorMsg]=useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    // Custom validation checks
    if (!values.name || !values.phone || !values.email || !values.pass) {
      toast.error('Please fill in all required fields.', {
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

    if (values.pass !== values.confirmPass) {
      toast.error('Password and Confirm Password do not match.', {
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

    if (values.select === 'retailer' && !values.GST) {
      toast.error('GST number is required for Retailers/Wholesalers.', {
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

    // Mobile number validation using regex (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(values.phone)) {
      toast.error('Please enter a valid 10-digit mobile number.', {
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

    // If all validation checks pass, continue with form submission
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        const user = res.user;
        setTimeout(() => {
          console.log('delayed')
          navigate("/");
          toast.success('Account Created successfully', {
      
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }, 1000);

        await updateProfile(user, {
          displayName: values.name,
        }).catch((error) => {
          // Handle profile update error
          toast.error(error.message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });

        try {
          const docRef = await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            phone: values.phone,
            GST: values.GST,
            registerAs: values.select,
          });

          setTimeout(() => {
            console.log('delayed');
            toast.success('Account Created successfully', {
      
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
         
          }, 1000); // Adjust the delay as needed
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      })
      .catch((err) => {
        console.log(err);
        seterrorMsg(err.message);
        toast.error(err.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  }
  


  


  return (
    <>
    <Header/>
    <Features/>
    <About/>
    <Testimonial/>



    </>
  )
}

export default HomePage