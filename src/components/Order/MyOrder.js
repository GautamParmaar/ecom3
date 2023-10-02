import React, { useState ,useEffect} from 'react'
import "../CSS/MyOrder.css"
import { auth, db } from '../../config/Config';
import { doc, getDoc } from 'firebase/firestore';

function MyOrder() {
const [order,setOrder]=useState([]);
useEffect(()=>{
  auth.onAuthStateChanged(async(user)=>{
    if(user){
      const userDocRef = doc(db, 'Orders', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
                  // Document data exists, you can access it using .data() method
                  const userData = userDoc.data();
                  console.log('Fetched data:', userData);
                  setOrder(userData);
                  
                 
                  
                  return userData;
                } else {
                  console.log('No such document!');
                  return null;
                }
      
    }
    else{
  console.log("not logged in")
    }
      
   
  
},[])
})


//get product info 






// order.Orders.map(item => {
//   // do something here ...
//   return item
// })






  
  
  
  
  
  
  
  
  //get product info

  order.Orders && order.Orders.map((order)=>{

  })
 
  
    

  
  return (
    < >


<h2 className='my-4' align="center">Order History</h2>

  {order.Orders && order.Orders.map((order,index) => (
   

  

<div class="product-box">
  <div class="product-info">
  <p class="quantity">S.No : {index+1}</p>
    <p class="product-id">Product ID: {order.id}</p> 
    
   
    {order.metadata.productName ? (
        <p className="product-id">Product Name: {order.metadata.productName.replace(/"/g, '')}</p>
      ) : (
        <p className="product-id">Product Name: N/A</p>
      )}
    <p class="total-price">Total Price: ₹{order.amount_total/100}</p>
    <p class="quantity">Quantity: {order.metadata.quantity}</p>
    <p class="order-date">Order Date: {order.metadata.Date}</p>
    <p class="payment-status">Payment Status: {order.payment_status}</p>
  </div>
  <div class="buttons">
    <button class="btn btn-primary my-0 mx-1">Order Details</button>
    <button class="btn btn-danger my-0 mx-1">Cancel Order</button>
    <button class="btn btn-primary my-0 mx-1">Pay Now</button> 
    
  </div>
</div>

))}







{/* <!-- ion-icons --> */}



    </>
  )
}

export default MyOrder