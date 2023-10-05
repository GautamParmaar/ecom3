import React, { useEffect, useState } from 'react'
import { auth } from '../../config/Config'
import AdminNavbar from './AdminNavbar';

function AllOrders() {

    const [userid,setUID]=useState(null)
    const [user,setUser]=useState();
    
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
  return (
    <div>
    {user && user.uid === adminUID ? (
      <><AdminNavbar/>
      <div align="center" className='my-4'>Welcome to the Admin order Dashboard</div>
      {/* table for displaying data */}
      <div class="table-responsive">
      <table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Order ID</th>
      <th scope="col">Order Date</th>
      <th scope="col">Product</th>
      <th scope="col">Total Price</th>
      <th scope="col">Payment Status</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo</td>
      <td>@mdo</td>
    </tr>
    
    
  </tbody>
</table>
      </div>
      
      
      
      
      </>
    ) : (
      <div>Error: You are not authorized to view this content</div>
    )}
  </div>
  )
}

export default AllOrders