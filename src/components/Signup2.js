import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import { setDoc,doc } from "firebase/firestore";
import {auth,db } from "../config/Config.js"


const Signup2 = () => {
  


    const navigate=useNavigate();
    // for backend
    const [values, setValues] = useState({
      email: '',
      pass: '',
      name :''
  
      // name: '',
      // number: ''
  
    })
    const [errorMsg,seterrorMsg]=useState('')
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: [event.target.value] },
        )
    }
  
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
            phone:values.number,
            GST:""
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
   <div className='container'>
<br/><br/>
<h1>Sign up</h1>
<hr/>
<form className='form-group'  onSubmit={handleSubmit}>
<label>Name</label>
<input type='text' name='name' className='form-control' required
onChange={(events)=>{
  setValues((prev)=>({...prev,name:events.target.value}))
}} 
></input>

<label>Email</label>
<input type='email' name='email' className='form-control' required
onChange={(events)=>{
  setValues((prev)=>({...prev,email:events.target.value}))
}}

></input>

<label>password</label>
<input type='password' name='pass' className='form-control' required
onChange={(events)=>{
  setValues((prev)=>({...prev,pass:events.target.value}))
}}
></input>

<label>Phone number</label>
<input type='number' name='number' className='form-control' required
onChange={(events)=>{
  setValues((prev)=>({...prev,number:events.target.value}))
}}
></input>
<br/>

<div className='btn-box'></div>
<span>Already have an account</span>
<Link to="/login2">Here</Link>
<button type='submit' className='btn btn-success btn-md'>Signup</button>
</form>
   </div>
   
   </>
  )
}

export default Signup2