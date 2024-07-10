import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from '../../config/Config';
import { signOut } from 'firebase/auth';
import {Icon} from 'react-icons-kit'
import "../CSS/NavBar.css"


function AdminNavbar() {
  const navigate=useNavigate();
  const handleSignOut=()=>{
    signOut(auth).then(val=>{
      console.log(val)
      navigate("/login")
      
    })
    } 

  
   

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
  
  <nav className="navbar" style={{position:'sticky',top:'0',zIndex:'10110'}} >
    <div className="nav-container">
      <NavLink exact to="/" className="nav-logo">
        Epharmacy
       
      </NavLink>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        {/* <li className="nav-item">
          <NavLink
            exact
            to="/"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li> */}
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
            to="/adminOrders"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}

           
          >
           Orders
          </NavLink>
        </li>
        
        
        
        <li className="nav-item">
          <NavLink
            exact
           to='/adminlogin'
            activeClassName="active"
            className="nav-links"
            onClick={handleSignOut}
            
          >
            Signout
          </NavLink>
        </li>
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
        
        
      </ul>
      <div className="nav-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </div>
  </nav>
    </>
  )
}

export default AdminNavbar