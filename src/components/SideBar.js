import React from "react";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Person2Icon from '@mui/icons-material/Person2';
import InventoryIcon from '@mui/icons-material/Inventory';
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import LogoutIcon from '@mui/icons-material/Logout';


import "./CSS/SideBar.css";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useEffect } from "react";
import MyOrder from "./Order/MyOrder";
import { Link, NavLink } from "react-router-dom";
import MyOrder2 from "./Order/MyOrder2";







const SideBar = () => {
  
  const { collapseSidebar } = useProSidebar();
  const checkScreenSizeAndCollapse = () => {
    const screenWidth = window.innerWidth;

    // You can adjust this threshold based on your design's responsiveness
    const mobileScreenWidthThreshold = 768; // Example threshold for mobile devices

    if (screenWidth <= mobileScreenWidthThreshold) {
      collapseSidebar();
    }
  };

  // Run the check when the component mounts and when the window is resized
  useEffect(() => {
    checkScreenSizeAndCollapse();

    // Add a listener to check when the window is resized
    window.addEventListener('resize', checkScreenSizeAndCollapse);

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkScreenSizeAndCollapse);
    };
  }, []); 

 
  


  
  

  return (
    <>

<div style={{ display: "flex", height: "100vh" }}>
  <Sidebar className="app">
    <Menu>
      <MenuItem className="menu1" icon={<MenuRoundedIcon onClick={() => {
        collapseSidebar();
      }} />}>
        {/* <h2>Customer Tab</h2> */} 
      </MenuItem>
     <NavLink className="textNav"> <MenuItem icon={<Person2Icon/>}  >Profile </MenuItem></NavLink>
     <NavLink className="textNav">  <MenuItem icon={<InventoryIcon/>}> Order History </MenuItem></NavLink>
     <NavLink className="textNav">  <MenuItem icon={<Icon icon={shoppingCart} size={25}/>}> Cart</MenuItem></NavLink>
     <NavLink className="textNav">   <MenuItem icon={<LogoutIcon/>}> Logout </MenuItem></NavLink>
    </Menu>
  </Sidebar>
  <div className="right-side">
    
    <MyOrder2/>
  </div>
</div>
    </>
  );
};

export default SideBar;