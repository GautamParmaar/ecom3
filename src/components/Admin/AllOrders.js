import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/Config'
import AdminNavbar from './AdminNavbar';
import {Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../CSS/AlOrder.css"
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';

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

   let dataofOrders=[]

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

// orders[0].Orders.map((item,index)=>{
//   console.log(item)
  
// })

     
      const adminUID = 'xjOj4RwBPnUNyFscGqqB6GJHbBt2';
      

      
      // fetchUserData()

      const pluckValuesFromAllOrders = (data, key) =>
      orders.flatMap((orderObj) =>
    orderObj.Orders?.map((order) => order[key]) || []
  );
 

  const orderIds = pluckValuesFromAllOrders(orders, 'id');
  const paymentStatuses = pluckValuesFromAllOrders(orders, 'payment_status');

  // const values = pluckValuesFromMetadata(orders, '');
  //   console.log(values,'id')

  //metadata code is working
  const pluckValuesFromMetadata = (data, key) =>
  orders.flatMap((orderObj) =>
    orderObj.Customer?.map((customer) => customer[key]) || []
  );

const orderMeta = pluckValuesFromMetadata(orders, 'ID');
console.log(orderMeta, 'meta');
console.log(orderIds,'id')


const pluckvaluefromData = (data, key) =>
  data.flatMap((orderObj) =>
    orderObj.Orders.flatMap((order) =>
      order.metadata ? [order.metadata[key]] : []
    )
  );

const meta = pluckvaluefromData(orders, 'UID'); // Use 'uid' instead of 'UID'
console.log(meta, 'hhhh');
      


    
  return (
    <div>
    {user && user.uid === adminUID ? (
      <><AdminNavbar/>
      <div align="center" className='my-4'>Welcome to the Admin order Dashboard</div>
      {/* table for displaying data */}
   
      <div className='table-responsive'>
      <Table className='table'>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Order ID</Th>
            <Th>Payment Status</Th>
            <Th>Quantity</Th>
            <Th>Total Price</Th>
            <Th>Payment Status</Th>
          </Tr>
        </Thead>
        <Tbody>
        {orders && orderIds.map((orderId, index) => (
          <Tr key={orderId}>
            <Td>{index+1}</Td>
            <Td style={{fontSize:'0.8rem'}}>{orderId}</Td>
            
            <Td>{paymentStatuses[index]}</Td>
            <Td>{orderMeta[index]}</Td>
            <Td></Td>
            <Td></Td>
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