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
  const admin2='CuEVOvzoiEhhn50CPJMeSzXKuoK2';
  return (
    <div>
      {user && user.uid === adminUID || user && user.uid===admin2? (
        <><AdminNavbar/>
        <div>Welcome to the Admin Dashboard</div></>
      ) : (
        <div>Error: You are not authorized to view this content</div>
      )}
    </div>
  )
}

export default AdminDashboard