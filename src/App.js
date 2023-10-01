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


function App() {

//getting current user id
 
const [userid,setUID]=useState(null)
const [user,setUser]=useState();
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
 
},[])






//getting products function
const [products, setProducts]=useState([]);





  
  return (
    <>
    <BrowserRouter>
   
    
    <Navbar2 user={user}/>
    <Routes>
           <Route path="/" element={<HomePage/> }/>

          <Route path="/products" element={<Home2/> }/>
          <Route path="/signup2" element={<Signup2/> }/>
          <Route path="/login2" element={<Login2/> }/>
          <Route path="/add" element={<AddProducts/>}/>
          <Route path="/cart" element={<Cart user={user} />}/>
          <Route path='/single/:id' element={<SingleProduct userid={userid}/>}/>
          <Route path='/profile' element={<Profile user={user}/>}></Route>
          <Route path="/login" element={<Login/> }/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path='/order' element={<OrderDetails user={user}/>}/>
          <Route path='/myorder' element={<MyOrder user={user}/>}/>





      
    </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
