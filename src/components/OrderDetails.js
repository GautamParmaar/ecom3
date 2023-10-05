import axios from 'axios';
import React,{useState} from 'react'
import { useEffect } from 'react';
import { auth } from '../config/Config';
import "./CSS/MyOrder.css"

function OrderDetails({user}) {

  const [orderDetails, setOrderDetails] = useState([]);//for fetching live order info


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
        let orderData=[]
       
      
        }

        const handleToken2=async(token)=>{
          const cart={id:userid}
          const queryParams = new URLSearchParams(cart).toString();
          
        const response=await axios.get(`http://localhost:8080/orderDetails2?${queryParams}`)
        setOrderDetails(response.data)
       

        }
        
         
let order=orderDetails;
        //for filtering search input

        const [searchQuery, setSearchQuery] = useState('');
const handleSearch = (event) => {
  setSearchQuery(event.target.value);
};
  

       
        
  return (
   <>
   
   <button className='btn btn-success' onClick={handleToken2}>Refresh Transactions</button>

   
   <div >
      <h2 className='my-4' align="center">Order History</h2>
      <input align="center"
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by product name"
      />

      {order&&
        order.map((orderItem, index) => (
          // Filter orders by product name
          orderItem.metadata.productName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) && (
            <div className="product-box" key={orderItem.id}>
              {/* Render order details */}
              <div className="product-info">
                <p className="quantity">S.No: {index + 1}</p>
                <p className="product-id">Order ID: {orderItem.id}</p>

                {orderItem.metadata.productName ? (
                  <p className="product-name">
                    Product Name: {JSON.parse(orderItem.metadata.productName).join(', ')}
                  </p>
                ) : (
                  <p className="product-name">Product Name: N/A</p>
                )}
                <p className="total-price">Total Price: ₹{orderItem.amount_total / 100}</p>
                <p className="quantity">Quantity: {orderItem.metadata.quantity}</p>
                <p className="order-date">Order Date: {orderItem.metadata.Date}</p>
                <p className="payment-status">Payment Status: {orderItem.payment_status}</p>
              </div>
              <div className="buttons">
                <button className="btn btn-primary my-0 mx-1">Order Details</button>
                <button className="btn btn-danger my-0 mx-1">Cancel Order</button>
                <button className="btn btn-primary my-0 mx-1">Pay Now</button>
              </div>
            </div>
          )
        ))}
    </div>


      

   </>
  )
}

export default OrderDetails