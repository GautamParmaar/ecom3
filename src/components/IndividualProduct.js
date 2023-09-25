import React from 'react'
import { Link, useParams } from 'react-router-dom';


export const IndividualProduct = ({individualProduct,addToCart}) => {
  let params=useParams();
    // console.log(individualProduct.image);

    const handleAddToCart=()=>{
      addToCart(individualProduct);
    }
  return (
    <div className='product'>
    <div className='product-img'>
    <Link to={`/single/${individualProduct.ID}`}> <img src={individualProduct.image}></img></Link> 
    </div>
    <div className='product-text title'>{individualProduct.name}</div>
    <div className='product-text description'>{individualProduct.description}</div>
    <div className='product-text price'>₹ {individualProduct.price}</div>
<div className='btn btn-danger btn-md cart-btn'  onClick={handleAddToCart}>ADD TO CART</div>

    </div>
  )
}
