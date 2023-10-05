import React, { useState ,useEffect} from 'react'
import "../CSS/MyOrder.css"
import { auth, db } from '../../config/Config';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

function MyOrder() {
const [order,setOrder]=useState([]);
const [User,setUser]=useState();


useEffect(()=>{
  auth.onAuthStateChanged(async(user)=>{
    if(user){
      setUser(user.uid)
      const userDocRef = doc(db, 'Orders', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
                  // Document data exists, you can access it using .data() method
                  const userData = userDoc.data();
                  // console.log('Fetched data:', userData.Orders[0].metadata.lineItems);
                  // const JSONData=userData.Orders[0].metadata.lineItems;
                  setOrder(userData);
                  // const second=JSON.parse(JSONData)
                  // console.log("json",second

                  // )
                  
                 
                  
                  return userData;
                } else {
                  console.log('No such document!');
                  return null;
                }
      
    }
    else{
  console.log("not logged in")
    }
   
   
  
},[])
})


//get product info 
let dataForSearch=[]
order.Orders && order.Orders.map((order,index)=>{
  dataForSearch=order.metadata.productName
  console.log(dataForSearch)

})
let datavalue;
let data2;
order.Orders && order.Orders.map((order,index)=>{
  datavalue=order.metadata.productName
  data2=JSON.parse(datavalue)
  console.log(data2,"data")

})
// if(order.Orders) {for (var i = 0; i < data2.length; i++) {
//   var item = data2[i];
//   console.log("Item " + i + ":");
//   for (var key in item) {
//     if (item.hasOwnProperty(key)) {
//       var value = item[key];
//       console.log(key + ": " + value);
//     }
//   }
// }
// }









const [searchQuery, setSearchQuery] = useState('');
const handleSearch = (event) => {
  setSearchQuery(event.target.value);
};
  
  
  
  
  
  
 
// const [filter,setFilter]=useState('')
// const searchText=(event)=>{
// setFilter(event.target.value);
// }
// if(order.Orders){let dataSearch=JSON.parse(order.Orders.metadata.productName).filter(item=>{
//   return Object.keys(item).some(key=>item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
// })}

const handleToken2=async(token)=>{
  const cart={id:User}
  const queryParams = new URLSearchParams(cart).toString();
  
const response=await axios.get(`http://localhost:8080/orderDetails2?${queryParams}`)


}
    

  
  return (
    < >

    {/* <input type='text' value={filter} placeholder='Search' onChange={searchText.bind(this)} /> */}
 

    <button className='btn btn-success' onClick={handleToken2}>Refresh Transactions</button>

    <div >
      <h2 className='my-4' align="center">Order History</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by product name"
      />

      {order.Orders &&
        order.Orders.map((orderItem, index) => (
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







{/* <!-- ion-icons --> */}



    </>
  )
}

export default MyOrder