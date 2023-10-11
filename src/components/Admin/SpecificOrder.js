import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { auth, db } from '../../config/Config';
import AdminNavbar from './AdminNavbar';
import "../CSS/Specific.css"
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

function SpecificOrder() {
    const [userid,setUID]=useState(null)
    const [user,setUser]=useState();
    const id=useParams();
    // console.log(id.id,'this is id')

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        // console.log(user.uid,"admin")
        setUID(user.uid)
        setUser(user);
      }
      else{
        setUser()
      }
    })
   
  },) 
  const adminUID = 'xjOj4RwBPnUNyFscGqqB6GJHbBt2';


  //function for fetching data from Orders databse through params order id
 
   const fetchDocumentsByField=async()=>{
    const ordersCollection = collection(db, 'Orders');
    const fieldToQuery = 'id'; // Change this to the name of your field
    const valueToMatch = id.id; // Change this to the value you're looking for
  
    const q = query(ordersCollection, where('Orders', 'array-contains', { id: valueToMatch })); // Change to valueToMatch
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          console.log('fetched');
          // Access the document data using doc.data()
        });
      } else {
        console.log('not found');
      }
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
   }
   fetchDocumentsByField()
  
 
  return (
   <>
     <div>
    {user && user.uid === adminUID ? (
      <><AdminNavbar/>
 <div class="container">
  <div class="customer_details orderList">
    <div class="orderTop">
      <h2 class="hidden-xs">My Orders</h2>
      <div class="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search all orders" name="search"/>
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    </div>
    <div class="order_tab">
      <ul class="tabs">
        <li class="tab-link current" data-tab="order_tab">Orders</li>
        <li class="tab-link" data-tab="buy_again">Buy Again</li>
        <li class="tab-link" data-tab="open_orders">Open Orders</li>
        <li class="tab-link" data-tab="cancelled_orders">Cancelled Orders</li>
      </ul>
      <div class="orderFilter">
        <label>1 order <span>placed in</span></label>
        <select>
          <option value="">Last 30 Days</option>
          <option value="">Past 6 Month</option>
          <option value="">2019</option>
          <option value="">2018</option>
        </select>
      </div>
    </div>


    <div style={{marginBottom:'2rem'}} id="order_tab" class="orderCardWrap tab-content1 current">
      <div class="orderCard">
        <div class="orderHead">
          <ul class="orderLeft">
            <li>
              <p>ORDER ID <span>{id.id}</span></p>
            </li>
            {/* <li>
              <p>TOTAL <span>$413.00</span></p>
            </li> */}
            <li>
              {/* <p>SHIP TO <span class="customerName">Customer Name</span>
                <span class="cstmrInfo">
                  <strong>Customer Name</strong> Lorem Ipsum is simply dummy text
                </span>
              </p> */}

            </li>
          </ul>
          <div class="invoiceDetails">
            <p>{id.id}<span><a href="#">Order Details</a></span> <span class="showInvoice"><a href="javascript:void(0)">Invoice <i class="fa fa-chevron-down" aria-hidden="true"></i></a></span></p>
            <div class="invioceModel">
              <ul>
                <li><a href="#">Invoice 1</a></li>
                <li><a href="#">Invoice 1</a></li>
                <li><a href="#">Invoice 1</a></li>
              </ul>
              <span class="modelClose"><i class="fa fa-times" aria-hidden="true"></i></span>
            </div>
          </div>
        </div>
        <div class="itemDetails">
          {/* <h3>Delivered 16-Mar-2019</h3>
          <p>Package was handed to a receptionist</p>
          <p>Signed by: Priti.</p> */}
          


          <div class="itemInfo">
            <div class="itemImg">
              <img src="images/product1.jpg" alt=""/>
            </div>
            <div class="itemDesc">
              <h4>Pigeon Stainless Steel Swig Water Bottle 750ml (Set of 2)</h4>
              <p>Sold by: <span>E-Emporium</span></p>
              <span class="itemPrice">$413.00</span>
              <span class="itemPrice">Quantity </span>
              <button class="buy_again">Cancel</button>
            </div>
          </div>


         
          {/* <div class="btn_group">
            <button class="buy_again">Return or replace items</button>
            <button class="gift_btn">Share gift receipt</button>
            <button class="gift_btn">Leave seller feedback</button>
          </div> */}
        </div>
        <div class="itemInfo">
            <div class="itemImg">
              <img src="images/product1.jpg" alt=""/>
            </div>
            <div class="itemDesc">
              <h4>Customer Name :Pigeon Stainless Steel Swig Water Bottle 750ml (Set of 2)</h4>
              <p>Email: <span>E-Emporium</span></p>
              <span class="itemPrice">Phone :</span>
              <span class="itemPrice">Address : </span>
             
            </div>
          </div>

       
      </div>
    </div>
 
  
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