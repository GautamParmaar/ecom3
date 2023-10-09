import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { auth } from '../../config/Config';
import AdminNavbar from './AdminNavbar';
import "../CSS/Specific.css"

function SpecificOrder() {
    const [userid,setUID]=useState(null)
    const [user,setUser]=useState();

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        console.log(user.uid,"admin")
        setUID(user.uid)
        setUser(user);
      }
      else{
        setUser()
      }
    })
   
  },[]) 
  const adminUID = 'xjOj4RwBPnUNyFscGqqB6GJHbBt2';
  const orders = [
    {
      id: 1,
      orderNumber: 'ORD12345ghfghfghgdhgdhhrthrthgrghhrtrthtyrtyrthrghghjgthth',
      date: '2023-10-01',
      total: 100.0,
      status: 'Delivered',
    },
    
    // Add more orders as needed
  ];
  return (
   <>
     <div>
    {user && user.uid === adminUID ? (
      <><AdminNavbar/>
     <div className="my-orders-box">
      <h1 className="my-orders-heading">My Orders</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order">
            <div className="order-details">
              <p className="order-number">Order Number: {order.orderNumber}</p>
              <p className="order-date">Date: {order.date}</p>
              <p className="order-total">Total: ${order.total.toFixed(2)}</p>
              <p className="order-status">Status: {order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      
    
      
      </>
    ) : (
      <div>Error: You are not authorized to view this content</div>
    )}
  </div>
   </>
  )
}

export default SpecificOrder