import React from 'react'
import { Link } from 'react-router-dom';

const IndividualFilteredProduct2 = ({IndividualFilteredProduct,addToCart,data}) => {
  
const handleAddToCart=()=>{
  addToCart(IndividualFilteredProduct);
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

    </div>
  )
}

export default IndividualFilteredProduct2