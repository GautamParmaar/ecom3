import React, { useEffect, useState } from 'react'
import { auth } from '../../config/Config'
import AdminNavbar from './AdminNavbar';

function AdminDashboard() {
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
        <div>Welcome to the Admin Dashboard</div></>
      ) : (
        <div>Error: You are not authorized to view this content</div>
      )}
    </div>
  )
}

export default AdminDashboard