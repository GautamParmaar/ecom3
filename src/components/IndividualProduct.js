import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const IndividualProduct = ({individualProduct,addToCart}) => {
  let params=useParams();
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
    // console.log(individualProduct.image);

    const handleAddToCart=()=>{
      addToCart(individualProduct);
      addToCartToast()
      
    }
  return (
    <>
    <div className='product'>
    <div className='product-img'>
    <Link to={`/single/${individualProduct.ID}`}> <img src={individualProduct.image}></img></Link> 
    </div>
    <div className='product-text title'>{individualProduct.name}</div>
    <div className='product-text description'>{individualProduct.description}</div>
    <div className='product-text price'>₹ {individualProduct.price}</div>
<div className='btn btn-danger btn-md cart-btn'  onClick={handleAddToCart}>ADD TO CART</div>
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />

    </div>
    </>
  )
}
