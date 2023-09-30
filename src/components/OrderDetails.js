import axios from 'axios';
import React,{useState} from 'react'
import { useEffect } from 'react';
import { auth } from '../config/Config';

function OrderDetails({user}) {

    const [userid,setUID]=useState(null)
useEffect(()=>{
  auth.onAuthStateChanged(user=>{
    if(user){
      console.log(user.uid)
      setUID(user.uid)
    }
    else{
    }
  })

},[])
    console.log(userid);
    const handleToken=async(token)=>{
        const cart={id:userid}
        const queryParams = new URLSearchParams(cart).toString();


        const response=await axios.get(`http://localhost:8080/orderDetails?${queryParams}`)
       let {orderData}=response.data
       console.log(orderData,"data")
        }

        const handleToken2=async(token)=>{
          const cart={id:userid}
          const queryParams = new URLSearchParams(cart).toString();
          
        const response=await axios.get(`http://localhost:8080/orderDetails2?${queryParams}`)
        let {orderData}=response.data
        console.log(orderData,"data")

        }


       
        
  return (
   <>
   <button onClick={handleToken}>okay</button>
   <button className='btn btn-success' onClick={handleToken2}>okay</button>

   </>
  )
}

export default OrderDetails