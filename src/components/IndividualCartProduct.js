import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../config/Config'
import { Link } from 'react-router-dom'


function IndividualCartProduct({cartProduct,cartProductIncrease,cartProductDecrease}) {
const handleCartProductIncrease=()=>{
    cartProductIncrease(cartProduct)
    
} 
const handleCartProductDecrease=()=>{
    cartProductDecrease(cartProduct)
}
const handleCartDelete=()=>{
    auth.onAuthStateChanged(user=>{
        if(user){
            const documentRef = doc(db, 'Cart '+ user.uid,cartProduct.ID);
            deleteDoc(documentRef)
    .then(() => {
        console.log("Document successfully deleted");
    })
    .catch((error) => {
        console.error("Error deleting document: ", error);
    });
        }
    })
}
console.log("cart",cartProduct) 
  return (
    <div className='product'>
            <div className='product-img'>
            <Link to={`/single/${cartProduct.ID}`}>  <img src={cartProduct.image} alt="product-img"/></Link> 
            </div>
            <div className='product-text title'>{cartProduct.name}</div>
            <div className='product-text description'>{cartProduct.description}</div>
            <div className='product-text price'>₹ {cartProduct.price}</div>
            <span>Quantity</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus'  onClick={handleCartProductDecrease}>
                    <Icon icon={minus} size={20}/>
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' onClick={handleCartProductIncrease} >
                    <Icon icon={plus} size={20}/>
                </div>
            </div>
            <div className='product-text cart-price'>$ {cartProduct.TotalProductPrice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleCartDelete}>DELETE</div>            
        </div>
    
  )
}

export default IndividualCartProduct