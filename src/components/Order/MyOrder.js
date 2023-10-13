import React, { useState ,useEffect} from 'react'
import "../CSS/MyOrder.css"
import { auth, db } from '../../config/Config';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

function MyOrder() {
const [order,setOrder]=useState([]);
const [User,setUser]=useState();
const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);


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

   
   
   
  
})
},[])


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











  
  
  
  
 


    const handleToken2=async(token)=>{
    const cart={id:User}
    const queryParams = new URLSearchParams(cart).toString();
    
  const response=await axios.get(`http://localhost:8080/orderDetails2?${queryParams}`)
  
  
  }


  // code sor search filter
  const handleSearch = () => {
    // Filter order items based on the search input
    const filteredResults = order.Orders.filter((orderItem) =>
      JSON.parse(orderItem.metadata.productName)
        .join(', ')
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );

    setSearchResults(filteredResults);
  };


   
  

  
  return (
    <>
      <button className='btn btn-success my-2  buttonTransaction' onClick={handleToken2}>Refresh Transactions</button>

      {/* Search input and button */}
      <div class="search-container2 my-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by product name"
        />
        <button type="submit" onClick={handleSearch}>
          <i class="fa fa-search"></i>
        </button>
      </div>

      {order.Orders && order.Orders.length > 0 ? (
        searchResults.length > 0
          ? searchResults.map((orderItem, index) => (
              <div className="container" key={orderItem.id}>
                <div className="customer_details orderList">
                  <div style={{ marginBottom: '2rem' }} id="order_tab" className="orderCardWrap tab-content1 current">
                    <div className="orderCard">
                      <div className="orderHead">
                        <ul className="orderLeft">
                          <li>
                            <p>
                              <b>ORDER ID :</b> <span className="textWidth">{orderItem.id}</span>
                            </p>
                          </li>
                          <li>
                            <p className="orderDate">Order Date: {orderItem.metadata.Date}</p>
                          </li>
                        </ul>
                        <div className="invoiceDetails">
                          <p>
                            <span>Order Date: {orderItem.metadata.Date}</span>
                          </p>
                          <div className="invioceModel">
                            <ul>
                              <li>
                                <a href="#">Invoice 1</a>
                              </li>
                              <li>
                                <a href="#">Invoice 1</a>
                              </li>
                              <li>
                                <a href="#">Invoice 1</a>
                              </li>
                            </ul>
                            <span className="modelClose">
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="itemDetails">
                        <div className="itemInfo">
                          <div className="itemDesc">
                            <h4>Product: {JSON.parse(orderItem.metadata.productName).join(', ')}</h4>
                            <h4>Quantity: {orderItem.metadata.quantity}</h4>
                            <h4>
                              <p>
                                Payment Status: <span>{orderItem.payment_status}</span>
                              </p>
                            </h4>
                            <span className="itemPrice">Price: ₹{orderItem.amount_total / 100}</span>
                            <button className="buy_again">Cancel Order</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : order.Orders.map((orderItem, index) => (
              <div className="container" key={orderItem.id}>
                <div className="customer_details orderList">
                  <div style={{ marginBottom: '2rem' }} id="order_tab" className="orderCardWrap tab-content1 current">
                    <div className="orderCard">
                      <div className="orderHead">
                        <ul className="orderLeft">
                          <li>
                            <p>
                              <b>ORDER ID :</b> <span className="textWidth">{orderItem.id}</span>
                            </p>
                          </li>
                          <li>
                            <p className="orderDate">Order Date: {orderItem.metadata.Date}</p>
                          </li>
                        </ul>
                        <div className="invoiceDetails">
                          <p>
                            <span>Order Date: {orderItem.metadata.Date}</span>
                          </p>
                          <div className="invioceModel">
                            <ul>
                              <li>
                                <a href="#">Invoice 1</a>
                              </li>
                              <li>
                                <a href="#">Invoice 1</a>
                              </li>
                              <li>
                                <a href="#">Invoice 1</a>
                              </li>
                            </ul>
                            <span className="modelClose">
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="itemDetails">
                        <div className="itemInfo">
                          <div className="itemDesc">
                            <h4>Product: {JSON.parse(orderItem.metadata.productName).join(', ')}</h4>
                            <h4>Quantity: {orderItem.metadata.quantity}</h4>
                            <h4>
                              <p>
                                Payment Status: <span>{orderItem.payment_status}</span>
                              </p>
                            </h4>
                            <span className="itemPrice">Price: ₹{orderItem.amount_total / 100}</span>
                            <button className="buy_again">Cancel Order</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
      ) : (
        <div className="container">
          <h4 align='center'>No Orders found</h4>
        </div>
      )}
    </>
  )
}

export default MyOrder