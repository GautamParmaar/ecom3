import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/Config'
import AdminNavbar from './AdminNavbar';
import {Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../CSS/AlOrder.css"
import { collection, getDocs } from 'firebase/firestore';

function AllOrders2() {

    const [orders, setOrders] = useState([]);
    // const [metadata, setMetadata] = useState([]);
    let metadata


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
  
     fetchData();
    },[]);
  return (
    <div>
    <h2>Orders</h2>
    <ul>
      {orders.map((order, index) => (
        <li key={index}>
          <h3>Order {index + 1}</h3>
          {order.Orders.map((orderData, subIndex) => (
            <div key={subIndex}>
              {/* Render each piece of data from your Orders */}
              {/* For example: */}
              <p>Product: {orderData.product}</p>
              <p>Quantity: {orderData.quantity}</p>
              {/* Add more data fields as needed */}
            </div>
          ))}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default AllOrders2