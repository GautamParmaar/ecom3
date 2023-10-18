import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/Config'
import AdminNavbar from './AdminNavbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


import { collection, getDocs } from 'firebase/firestore';
import "../CSS/Specific.css"

function AllOrders() {
 const [userid,setUID]=useState(null)
    const [user,setUser]=useState();
    const [orders, setOrders] = useState([]); 
    const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
    
  
    


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


  useEffect(() => {
    // Reference to your Firestore collection
    const ordersCollection = collection(db, 'Orders');

    // Fetch all documents from the collection
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(ordersCollection);
        const ordersData = [];

        querySnapshot.forEach((doc) => {
          // Store the document ID along with the data
          ordersData.push({...doc.data() });
        });
       

        setOrders(ordersData);
        // console.log(orders,"orders")
       
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

  user&& fetchData();
  },);

// for testing
// orders.map((order,index)=>{
//   order.Orders.map((orderData,subIndex)=>{
//     console.log(orderData.metadata,subIndex)
//   })
// })


  // Filter orders based on the selected date range
  const filteredOrders = orders.filter((order) => {
    const orderDate = moment(order.Orders[0].metadata.Date, 'DD/MM/YYYY');
    return (!startDate || orderDate.isSameOrAfter(startDate)) && (!endDate || orderDate.isSameOrBefore(endDate));
  });



     

 
 

 

  






      


    
  return (
    <div>
    {user && user.uid === adminUID ? (
      <><AdminNavbar/>

      
      <div align="center" className='my-4'>Welcome to the Admin order Dashboard</div>
      
      
     
     
   
      <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
            />
          </div>
    
     
           
      

  


<div class="container">
  <div class="customer_details orderList">
    <div class="orderTop">
      <h2 class="hidden-xs">All Orders</h2>
      <div class="search-container"></div>
    </div>
    <div class="order_tab"></div>

    {orders && filteredOrders.map((order, index) => (
      <div style={{ marginBottom: '2rem' }} id="order_tab" class="orderCardWrap tab-content1 current">
        <div class="orderCard">
          <div class="orderHead">
          {order.Orders.map((orderData, subIndex) => ( <>
            <ul class="orderLeft">
              <li>
                S.No: <span>{index + 1}</span>
              </li>
             
                <li key={orderData.id}>
                  <p><b>ORDER ID</b> <span className="textWidth">{orderData.id}</span></p>
                </li>
                
            </ul>
            <div class="invoiceDetails">
              <p>Order Date: <span>{orderData.metadata.Date}</span></p>
            </div></> ))}
          </div>

          {order.Orders.map((orderData, subIndex) => (
            <div class="itemDetails" key={orderData.id}>
              <div class="itemInfo">
                <div class="itemImg"></div>
                <div class="itemDesc">
                  <h4><b style={{ color: 'black' }}>Product: </b> {JSON.parse(orderData.metadata.productName).join(', ')} </h4>
                  <h4 class="itemPrice"><b style={{ color: 'black' }}>Price: </b>₹{orderData.amount_total / 100}</h4>
                  <h4 class="itemPrice"><b style={{ color: 'black' }}>Quantity: </b>{orderData.metadata.quantity} </h4>
                  <h4 class="itemPrice"><b style={{ color: 'black' }}>Payment Status: </b>{orderData.payment_status} </h4>
                </div>
              </div>
              <div class="itemInfo">
                <div class="itemImg"></div>
                <div class="itemDesc">
                  <h4 class="itemPrice"><b style={{ color: 'black' }}>Customer Name:</b> {JSON.parse(orderData.metadata.CustomerName)}</h4>
                  <h4 class="itemPrice"><b style={{ color: 'black' }}>Email: </b>{JSON.parse(orderData.metadata.CustomerEmail)}</h4>
                  <h4 class="itemPrice"><b style={{ color: 'black' }}>Phone: </b>{JSON.parse(orderData.metadata.CustomerPhone)} </h4>
                  <h4 class="itemPrice"><b style={{ color: 'black' }}>Address:</b> </h4>
                  <button class="btn btn-danger mt-1">Cancel Order</button>
                </div>
              </div>
            </div>
          ))}
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
  )
}

export default AllOrders