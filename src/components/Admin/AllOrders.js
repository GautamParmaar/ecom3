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

// Create a new object with the extracted data
const newDataObject = {
  orderIds,
  paymentStatuses,
  amountTotal,
  orderMeta,
  quantity,
 
  customerUID,
  customerName,
  customerEmail,
  customerPhone,
};

// You can now use newDataObject for rendering or any other purposes.
console.log(newDataObject,'testing');

// console.log('UID,',customerUID)


 // Function to handle changes in the search input

 const parseCustomDate = (customDate) => {
  if (customDate) {
    const [dateStr, timeStr] = customDate.split(' @ ');
    const [day, month, year] = dateStr.split('/').map(Number);
    const [hour, minute, second] = timeStr.split(':').map(Number);

    // Create a Date object using the UTC constructor
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  } else {
    return null; // Handle the case where customDate is undefined
  }
};

// Define a function to filter orders based on the selected date range
const filterOrdersByDate = () => {
  const filteredOrders = orders.filter((order) => {
    const orderDate = parseCustomDate(order.Date);
    return startDate <= orderDate && orderDate <= endDate;
  });
  setOrders(filteredOrders);  };

 
 

 

  






      


    
  return (
    <div>
    {user && user.uid === adminUID ? (
      <><AdminNavbar/>

      
      <div align="center" className='my-4'>Welcome to the Admin order Dashboard</div>
      
      <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate((e.target.value))}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate((e.target.value))}
          />
          <button onClick={filterOrdersByDate}>Filter by Date</button>
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
              <p   key={orderId} > <b>ORDER ID</b> <span className="textWidth">{orderId}</span></p>
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
            <p >Order Date : <span >{Date[index]}</span> </p> 
           
          </div>
        </div>
        
        <div class="itemDetails">
          {/* <h3>Delivered 16-Mar-2019</h3>
          <p>Package was handed to a receptionist</p>
          <p>Signed by: Priti.</p> */}
          


          <div class="itemInfo">
            <div class="itemImg">
            </div>
            <div class="itemDesc">
              <h4><b style={{color:'black'}}>Product : </b> {JSON.parse(productname[index]).join(', ')} </h4>
             
              <h4 class="itemPrice"><b style={{color:'black'}}>Price: </b >₹{amountTotal[index]/100}</h4>
              <h4 class="itemPrice"><b style={{color:'black'}}>Quantity: </b>{quantity[index]} </h4>
              <h4 class="itemPrice"><b style={{color:'black'}}>Payment Status: </b>{paymentStatuses[index]} </h4>

             
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
             
            </div>
            <div class="itemDesc">
              <h4 class="itemPrice">&nbsp;&nbsp;<b style={{color:'black'}}>Customer Name:</b> {customerName[index]}</h4>
              

              <h4 class="itemPrice"><b style={{color:'black'}}>&nbsp;&nbsp;Email: </b>{customerEmail[index]}</h4>
              <h4 class="itemPrice"><b style={{color:'black'}}>&nbsp;&nbsp;Phone: </b>{customerPhone[index]} </h4>
              <h4 class="itemPrice"><b style={{color:'black'}}>&nbsp;&nbsp;Address: </b> </h4>
              <button class="btn btn-danger mt-1">Cancel Order</button>

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