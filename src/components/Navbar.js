import React,{useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'


import "./CSS/NavBar.css";
import { auth, db } from "../config/Config";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";



const Navbar2 = ({ user }) => {
  const navigate=useNavigate();

  const handleSignOut=()=>{
    signOut(auth).then(val=>{
      console.log(val)
      navigate("/login")
      
    })
    } 
   

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const [totalProducts,setTotalProducts]=useState(0);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        const cartCollectionRef = collection(db, 'Cart '+user.uid);
        const cartCollectionQuery = query(cartCollectionRef);
        onSnapshot(cartCollectionQuery, (snapshot) => {
          const qty = snapshot.size;
          setTotalProducts(qty);
          console.log("qt",qty)
      });
      

      }
    })
  })
  return (
    <nav className="navbar">
    <div className="nav-container">
      <NavLink exact to="/" className="nav-logo">
        Ecommerce
        <i className="fas fa-code"></i>
      </NavLink>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <NavLink
            exact
            to="/"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/products"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}

           
          >
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/profile"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}

            
          >
           Profile
          </NavLink>
        </li>
        {!user&&
        <li className="nav-item">
          <NavLink
            exact
            to="/login"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Login
           
          </NavLink>
        </li>}
        {user&&<li className="nav-item">
          <NavLink
            exact
            to="/contact"
            activeClassName="active"
            className="nav-links"
            onClick={handleSignOut}
          >
            Signout
          </NavLink>
        </li>}
        <li className="nav-item">
          <NavLink
            exact
            to="/add"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Add product
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/cart"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
                            Cart <Icon icon={shoppingCart} size={25}/>
                                </NavLink>
        </li>
        
      </ul>
      <div className="nav-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </div>
  </nav>
  );
};

export default Navbar2;