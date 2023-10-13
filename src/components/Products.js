import React from 'react'
import {IndividualProduct} from './IndividualProduct'


const Products3 = ({products,addToCart}) => {
  // console.log(products);
  if(products && addToCart){
  return products.map((individualProduct)=>{
   return <IndividualProduct key={individualProduct.ID} individualProduct={individualProduct}
   addToCart={addToCart}/>
  })}
  
  
    
  
}

export default Products3