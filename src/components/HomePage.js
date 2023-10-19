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
    


    <div className='d-sm-flex borderBox' >
    <div id="carouselExampleAutoplaying" data-interval="3000" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img  src="./4.png" className="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="./5.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="./3.jpg" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


{/* signup form for laptop & bg screen devices */}
{/* <SignUp className='signUpComponent' /> */}
<section className='sectionContainer signUpComponent' >
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
              <input type="password" class="form-control" placeholder="Confirm Password" onChange={(events)=>{
  setValues((prev)=>({...prev,confirmPass:events.target.value}))
}}  required/>
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
  <input
    type="text"
    name='GST'
    disabled={values.select === 'Doctor'}
    title="GST number is only required for Retailers/Wholesalers"
    class="form-control"
    onChange={(events) => {
      setValues((prev) => ({ ...prev, GST: events.target.value }));
    }}
    placeholder="Your GST number"
    required={values.select === 'retailer'} 
  />
</div>
      </div> <br/><br/>
          </div>
          <div class="row align-items-center">
          <Link to="/login">  <a to="/login">Already have an account </a></Link>
          <ToastContainer/>
          <ToastContainer/>


          </div>
          <div class="">
              <button type='submit' onClick={handleSubmit} class="btn btn-primary mt-2">Submit</button>

          </div>
    
      
          
          
        </div>
      </div>
    </div>
  </section>

</div>
<br/>


{/* signup form ends here */}
<Schemes/>
<CarouselProduct user={user}/>



    </>
  )
}

export default HomePage