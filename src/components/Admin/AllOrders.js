import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/Config'
import AdminNavbar from './AdminNavbar';
import {Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../CSS/AlOrder.css"
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

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
        console.log(orders,"orders")
       
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

  user&& fetchData();
  },[]);



     
      

      
      
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

      


    
  return (
    <div>
    {user && user.uid === adminUID ? (
      <><AdminNavbar/>
      <div align="center" className='my-4'>Welcome to the Admin order Dashboard</div>
      {/* table for displaying data */}
   
      <div className='table-responsive'>
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
    </div>
      
      </>
    ) : (
      <div>Error: You are not authorized to view this content</div>
    )}
  </div>
  )
}

export default AllOrders