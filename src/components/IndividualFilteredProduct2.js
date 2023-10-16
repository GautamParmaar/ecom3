import React from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IndividualFilteredProduct2 = ({IndividualFilteredProduct,addToCart,data}) => {

  let addToCartToast=()=>{
    toast.info('Product has been added to cart', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });};
  
const handleAddToCart=()=>{
  addToCart(IndividualFilteredProduct);
  addToCartToast()
}

  return (
    <div className='product'>
      <div className='product-img'>
      <Link to={`/single/${IndividualFilteredProduct.ID}`}>  <img src={IndividualFilteredProduct.image}></img></Link>
      </div>
<div className='product-text title'>{IndividualFilteredProduct.name}</div>
<div className='product-text description'>{IndividualFilteredProduct.description}</div>
    <div className='product-text price'>₹ {IndividualFilteredProduct.price}</div>
<div className='btn btn-danger btn-md cart-btn'  onClick={handleAddToCart}>ADD TO CART</div>
<ToastContainer />

    </div>
  )
}

export default IndividualFilteredProduct2