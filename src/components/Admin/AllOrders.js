import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/Config'
import AdminNavbar from './AdminNavbar';
import {Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../CSS/AlOrder.css"
import { collection, getDocs } from 'firebase/firestore';

function AllOrders() {

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

    const [userid,setUID]=useState(null)
    const [user,setUser]=useState();
    const [orders, setOrders] = useState([]); 

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
          ordersData.push({  ...doc.data() });
        });

        setOrders(ordersData);
        console.log(orders,"orders")
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

   fetchData();
  }, [db]);
//data for admin order panel is so mixed up thats why i will use this map & array destructuring method

// Create an array to store all the Orders arrays along with their respective ids

const allOrdersWithId = [];

// Loop through the array of objects
orders.forEach((item) => {
  // Destructure the object to get the 'id' and 'Orders' properties
  const { id, Orders } = item;

  // If 'Orders' exists and is an array, push it into 'allOrdersWithId' along with the 'id'
  if (Array.isArray(Orders)) {
    allOrdersWithId.push({  Orders });
  }
});

// 'allOrdersWithId' now contains objects with 'id' and 'Orders' properties
console.log(allOrdersWithId.Orders,'chck');

orders.forEach((item,index)=>{
  console.log(item.Orders,'item')
  
})

console.log(allOrdersWithId.length,)
let secArray=[]

allOrdersWithId.forEach((item,index)=>{
  console.log(item.Orders,index)
  secArray.push(item.Orders)

})

let third=[]
console.log(secArray,'second')
secArray.map((item,index)=>{
  console.log(item,index,'sec')
  
  
})
secArray.forEach((item,index)=>{
  console.log(item.id)
})









    
     
      const adminUID = 'xjOj4RwBPnUNyFscGqqB6GJHbBt2';


      //for checking details of order array
      // orders && orders.Orders.map((item,index)=>{
      //   console.log(item,"hello")

      // })


    
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
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Total Price</Th>
            <Th>Payment Status</Th>
          </Tr>
        </Thead>
        <Tbody>
        {orders && orders.map((order, index) => (
          <Tr key={index}>
            <Td>{index+1}</Td>
            <Td>{order.id}</Td>
            
            <Td></Td>
            <Td></Td>
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