import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home2 from './components/Home';
import AddProducts from './components/AddProducts';
import Navbar2 from './components/Navbar';
import { useEffect, useState } from 'react';
import Cart from './components/Cart';
import SingleProduct from './components/SingleProduct';
import { auth } from './config/Config';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import OrderDetails from './components/OrderDetails';
import MyOrder from './components/Order/MyOrder';

import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AllOrders from './components/Admin/AllOrders';
import SpecificOrder from './components/Admin/SpecificOrder';
import Topbar from './components/Topbar';
import Demo from './components/Demo';


function App() {

//getting current user id
 
const [userid,setUID]=useState(null)
const [user,setUser]=useState();
const [orders, setOrders] = useState([]); 
useEffect(()=>{
  auth.onAuthStateChanged(user=>{
    if(user){
      console.log(user.uid)
      setUID(user.uid)
      setUser(user);
    }
    else{
      setUser()
    }
  })
 
},)






//getting products function
const [products, setProducts]=useState([]);





  
  return (
    <>
    <BrowserRouter>
   
    
   
    
    <Routes>
    
           <Route path="/" element={<>
            <Topbar/> <Navbar2 user={user}/>
           <HomePage user={user}/></> }/>

          <Route path="/products" element={<> <Topbar/> <Navbar2 user={user}/><Home2/> </>}/>
          <Route path="/add" element={<AddProducts user={user}/>}/>
          <Route path="/cart" element={<> <Navbar2 user={user}/><Cart user={user} /></>}/>
          <Route path='/single/:id' element={<> <Navbar2 user={user}/><SingleProduct userid={userid}/></>}/>
          <Route path="/login" element={<> <Topbar/> <Navbar2 user={user}/><Login/></> }/>
          <Route path="/signup" element={<>  <Navbar2 user={user}/><SignUp/></>}/>
          <Route path='/order' element={<> <Navbar2 user={user}/><OrderDetails user={user}/></>}/>
          <Route path='/myorder' element={<> <Navbar2 user={user}/><MyOrder user={user}/></>}/>


          {/*Route for admin  */}
          <Route path='/AdminLogin' element={<AdminLogin/>}/>
          <Route path='/AdminDashboard' element={<>  <AdminDashboard/></>}/>
          <Route path='/adminOrders' element={<AllOrders/>}/>
          <Route path='/singleorder/:id'exact  element={<SpecificOrder/>}/>
          <Route path='/homedemo' element={<Demo/>}/>



          





      
    </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
