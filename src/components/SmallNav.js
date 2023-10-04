import React from 'react'
import { NavLink } from 'react-router-dom'

function SmallNav() {
  return (
    <>
     <nav className="navbar">
    <div className="nav-container">
      <NavLink exact to="/" className="nav-logo">
        Ecommerce
        
      </NavLink> 

      <ul className={'' ? "nav-menu active" : "nav-menu"}>
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
           
           
          >
            Products
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            exact
            to="/profile"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}

            
          >
           Profile
          </NavLink>
        </li> */}
       
        <li className="nav-item">
          <NavLink
            exact
            to="/login"
            activeClassName="active"
            className="nav-links"
            
          >
            Login
           
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/contact"
            activeClassName="active"
            className="nav-links"
           
          >
            Signout
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            exact
            to="/add"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Add product
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink
            exact
            to="/cart"
            activeClassName="active"
            className="nav-links"
          
          >
                            
                                </NavLink>
        </li>
        
      </ul>
      <div className="nav-icon" >
      
      </div>
    </div>
  </nav>
    </>
  )
}

export default SmallNav