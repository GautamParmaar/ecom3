import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home2 from './components/Home';
import Signup2 from './components/Signup2';
import Login2 from './components/Login2';
import AddProducts from './components/AddProducts';
import Navbar2 from './components/Navbar';
import { useEffect, useState } from 'react';
import Cart from './components/Cart';
import SingleProduct from './components/SingleProduct';
import { auth, db } from './config/Config';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import OrderDetails from './components/OrderDetails';
import MyOrder from './components/Order/MyOrder';
import SideBar from './components/SideBar';
import { Sidebar } from 'react-pro-sidebar';
import MyOrder2 from './components/Order/MyOrder2';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminNavbar from './components/Admin/AdminNavbar';
import AllOrders from './components/Admin/AllOrders';
import AllOrders2 from './components/Admin/AllOrders2';
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
          <Route path="/signup2" element={<> <Navbar2 user={user}/><Signup2/></> }/>
          <Route path="/login2" element={<> <Navbar2 user={user}/><Login2/> </> }/>
          <Route path="/add" element={<AddProducts user={user}/>}/>
          <Route path="/cart" element={<> <Navbar2 user={user}/><Cart user={user} /></>}/>
          <Route path='/single/:id' element={<> <Navbar2 user={user}/><SingleProduct userid={userid}/></>}/>
          {/* <Route path='/profile' element={<> <Navbar2 user={user}/><Profile user={user}/></>}></Route> */}
          <Route path="/login" element={<> <Topbar/> <Navbar2 user={user}/><Login/></> }/>
          <Route path="/signup" element={<>  <Navbar2 user={user}/><SignUp/></>}/>
          <Route path='/order' element={<> <Navbar2 user={user}/><OrderDetails user={user}/></>}/>
          <Route path='/myorder' element={<> <Navbar2 user={user}/><MyOrder user={user}/></>}/>
          <Route path='order2' element={<> <Navbar2 user={user}/><MyOrder2/></>}/>


          {/*Route for admin  */}
          <Route path='/AdminLogin' element={<AdminLogin/>}/>
          <Route path='/AdminDashboard' element={<>  <AdminDashboard/></>}/>
          <Route path='/adminOrders' element={<AllOrders/>}/>
          <Route path='/adminOrders2' element={<AllOrders2/>}/>
          <Route path='/singleorder/:id'exact  element={<SpecificOrder/>}/>
          <Route path='/homedemo' element={<Demo/>}/>



          





      
    </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
