import React, { useEffect, useState } from 'react';
import { auth, db } from '../../config/Config';
import AdminNavbar from './AdminNavbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { collection, getDocs } from 'firebase/firestore';
import "../CSS/Specific.css";

function AllOrders() {
  const [userid, setUID] = useState(null);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [serialCounter, setSerialCounter] = useState(1); // Initialize the serial counter

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid, "admin");
        setUID(user.uid);
        setUser(user);
      } else {
        setUser();
      }
    });
  }, []);
  
  const adminUID = process.env.REACT_APP_ADMINUID;

  useEffect(() => {
    const ordersCollection = collection(db, 'Orders');

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(ordersCollection);
        const ordersData = [];

        querySnapshot.forEach((doc) => {
          ordersData.push({ ...doc.data() });
        });

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

    user && fetchData();
  }, [user]);

  const filteredOrders = orders.filter((order) => {
    const orderDate = moment(order.Orders[0].metadata.Date, 'DD/MM/YYYY');
    return (!startDate || orderDate.isSameOrAfter(startDate)) && (!endDate || orderDate.isSameOrBefore(endDate));
  });

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
      {user && user.uid === adminUID ||"CuEVOvzoiEhhn50CPJMeSzXKuoK2" ? (
        <>
          {/* Your AdminNavbar */}
          <AdminNavbar/>
          <div style={{fontSize:'30px',textAlign:'center',marginTop:'5px',}} className='OrderLabel my-2'>All Orders</div>
          <div className="container">
            <div className="customer_details orderList">
              <div className="orderTop">
                <h5>Filter Orders by Date</h5>
                <label htmlFor="startDate">Select Date:</label>
                <div className='filterbox2'>
                  <input
                    className='dateInput'
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <div className='Datelabel'>To</div>
                  <input
                    className='dateInput'
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <button className='btn btn-danger my-2' onClick={reset}>Reset Filter</button>
              </div>
              <div className="order_tab">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <div key={index}>
                      {order.Orders.map((orderData, subIndex) => (
                        <div key={subIndex} style={{ marginBottom: '2rem' }}>
                          <div className="orderCardWrap orderCard tab-content1 current" id="order_tab">
                            <div className="orderHead">
                              <ul className="orderLeft">
                                <li>
                                  S.No: <span>{index + 1}</span>
                                </li>
                                <li>
                                  <p>
                                    <b>ORDER ID</b>{' '}
                                    <span className="textWidth">{orderData.id}</span>
                                  </p>
                                </li>
                              </ul>
                              <div className="invoiceDetails">
                                <p>
                                  Order Date: <span>{orderData.metadata.Date}</span>
                                </p>
                              </div>
                            </div>
                            <div className="itemDetails">
                              <div className="itemInfo">
                                <div className="itemImg"></div>
                                <div className="itemDesc">
                                  <h4>
                                    <b style={{ color: 'black' }}>Product: </b>{' '}
                                    {JSON.parse(orderData.metadata.productName).join(', ')}
                                  </h4>
                                  <h4 className="itemPrice">
                                    <b style={{ color: 'black' }}>Price: </b>
                                    ₹{orderData.amount_total / 100}
                                  </h4>
                                  <h4 className="itemPrice">
                                    <b style={{ color: 'black' }}>Quantity: </b>
                                    {orderData.metadata.quantity}
                                  </h4>
                                  <h4 className="itemPrice">
                                    <b style={{ color: 'black' }}>Payment Status: </b>
                                    {orderData.payment_status}
                                  </h4>
                                </div>
                              </div>
                              <div className="itemInfo">
                                <div className="itemImg"></div>
                                <div className="itemDesc">
                                  <h4 className="itemPrice">
                                    <b style={{ color: 'black' }}>Customer Name:</b> 
                                    {orderData.metadata.CustomerName}
                                  </h4>
                                  <h4 className="itemPrice">
                                    <b style={{ color: 'black' }}>Email: </b>
                                    {orderData.metadata.CustomerEmail}
                                  </h4>
                                  <h4 className="itemPrice">
                                    <b style={{ color: 'black' }}>Phone: </b>
                                    {orderData.metadata.CustomerPhone}
                                  </h4>
                                  <h4 className="itemPrice">
                                    <b style={{ color: 'black' }}>Address:</b>
                                  </h4>
                                  <button className="btn btn-danger mt-1">Cancel Order</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div>No matching Orders</div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Error: You are not authorized to view this content</div>
      )}
    </div>
  );
}

export default AllOrders;
