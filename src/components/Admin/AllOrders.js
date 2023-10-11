import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/Config'
import AdminNavbar from './AdminNavbar';
import {Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../CSS/AlOrder.css"
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "../CSS/Specific.css"
import SpecificOrder from './SpecificOrder';

function AllOrders() {
 const [userid,setUID]=useState(null)
    const [user,setUser]=useState();
    const [orders, setOrders] = useState([]); 

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



     
      

      
      
      const pluckValuesFromAllOrders = (data, key) =>
      orders.flatMap((orderObj) =>
    orderObj.Orders?.map((order) => order[key]) || []
  );
 

  const orderIds = pluckValuesFromAllOrders(orders, 'id');
  const paymentStatuses = pluckValuesFromAllOrders(orders, 'payment_status');
  const amountTotal=pluckValuesFromAllOrders(orders,'amount_total')



  //metadata code is working
  const pluckValuesFromMetadata = (data, key) =>
  orders.flatMap((orderObj) =>
    orderObj.Customer?.map((customer) => customer[key]) || []
  );

const orderMeta = pluckValuesFromMetadata(orders, 'ID');
console.log(orderMeta, 'meta');
console.log(orderIds,'id')

//using this code for fetching metadata from order object
const pluckvaluefromData = (data, key) =>
  data.flatMap((orderObj) =>
    orderObj.Orders.flatMap((order) =>
      order.metadata ? [order.metadata[key]] : []
    )
  );

const quantity = pluckvaluefromData(orders, 'quantity'); // Use 'uid' instead of 'UID'
const Date=pluckvaluefromData(orders,'Date')
const productname=pluckvaluefromData(orders,'productName')
const customerUID=pluckValuesFromMetadata(orders,'UID')
const customerName=pluckvaluefromData(orders,'CustomerName')
const customerEmail=pluckvaluefromData(orders,'CustomerEmail')
const customerPhone=pluckvaluefromData(orders,'CustomerPhone')

// console.log('UID,',customerUID)





      


    
  return (
    <div>
    {user && user.uid === adminUID ? (
      <><AdminNavbar/>
      <div align="center" className='my-4'>Welcome to the Admin order Dashboard</div>
      {/* table for displaying data */}
   
      {/* <div className='table-responsive'>
      <Table className='table  table-bordered table-hover'>
        <Thead className='table-dark'>
          <Tr>
            <Th className="text-center">#</Th>
            <Th className="text-center">Order ID</Th>
            <Th className="text-center">Payment Status</Th>
            <Th className="text-center">Quantity</Th>
            <Th className="text-center">Total Price</Th>
            <Th className="text-center">Date</Th>
            <Th className="text-center">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
        {orders && orderIds.map((orderId, index) => (
          <Tr key={orderId}>
            <Td className="text-center">{index+1}</Td>
           <Td className="text-center" style={{fontSize:'0.8rem'}}><Link style={{textDecoration:'none'}} to={`/singleorder/${orderId}`}>{orderId}</Link></Td>
            
            <Td className="text-center">{paymentStatuses[index]}</Td>
            <Td className="text-center">{quantity[index]}</Td>
            <Td className="text-center">{amountTotal[index]/100}</Td>
            <Td className="text-center">{Date[index]}</Td>
            <Td className="text-center"><button className='btn btn-danger'>Cancel</button></Td>
          </Tr>
            ))} 
        </Tbody>
      </Table>

<br/><br/>

    </div> */}

    <div class="container">
  <div class="customer_details orderList">
    <div class="orderTop">
      <h2 class="hidden-xs">All Orders</h2>
      <div class="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search all orders" name="search"/>
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    </div>
    <div class="order_tab">
      {/* <ul class="tabs">
        <li class="tab-link current" data-tab="order_tab">Orders</li>
        <li class="tab-link" data-tab="buy_again">Buy Again</li>
        <li class="tab-link" data-tab="open_orders">Open Orders</li>
        <li class="tab-link" data-tab="cancelled_orders">Cancelled Orders</li>
      </ul> */}
      {/* <div class="orderFilter">
        <label>1 order <span>placed in</span></label>
        <select>
          <option value="">Last 30 Days</option>
          <option value="">Past 6 Month</option>
          <option value="">2019</option>
          <option value="">2018</option>
        </select>
      </div> */}
    </div>

    {orders && orderIds.map((orderId, index) => (
    <div style={{marginBottom:'2rem'}} id="order_tab" class="orderCardWrap tab-content1 current">
      <div class="orderCard">
        <div class="orderHead">
          <ul class="orderLeft">
        <li>
          S.No : <span>{index+1}</span>
        </li>
            <li>
              <p   key={orderId}> ORDER ID <span className='order-id'>{orderId}</span></p>
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
            {/* <p><span><a href="#">Order Details</a></span> <span class="showInvoice"><a href="javascript:void(0)">Invoice <i class="fa fa-chevron-down" aria-hidden="true"></i></a></span></p>
            <div class="invioceModel">
              <ul>
                <li><a href="#">Invoice 1</a></li>
                <li><a href="#">Invoice 1</a></li>
                <li><a href="#">Invoice 1</a></li>
              </ul>
              <span class="modelClose"><i class="fa fa-times" aria-hidden="true"></i></span>
            </div> */}
            <p>Order Date :{Date[index]}</p>
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
              <h4>Product : {JSON.parse(productname[index]).join(', ')} </h4>
             
              <span class="itemPrice">Price : ₹{amountTotal[index]/100}</span>
              <span class="itemPrice">Quantity {quantity[index]} </span>
              <span class="itemPrice">Payment Status :{paymentStatuses[index]} </span>

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
              <h4>Customer Name :  {customerName[index]}</h4>
              <p>Email: <span>{customerEmail[index]}</span></p>
              <span class="itemPrice">Phone : {customerPhone[index]}</span>
              <span class="itemPrice">Address : </span>
             
            </div>
          </div>

       
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