import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/Config';
import { getDoc,doc,collection, getDocs, onSnapshot,updateDoc } from "firebase/firestore";
import CartProducts from './CartProducts';
import StripeCheckout from 'react-stripe-checkout'



function Cart() {

    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
          if(user){
            console.log("fhfdkf",user.uid);
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log('Fetched data:', userData);
              
              
            } else {
              console.log('No such document!');
              
            }

          }
         
         })
        })


        
        
        
        
        //state of cart products

        const [cartProducts,setCartProducts]=useState([])
        //getting cart item from firestore



        useEffect(()=>{
     auth.onAuthStateChanged(async(user)=>{
        if(user){
            // const userCartData = await getDocs(collection(db, 'cart '+user.uid)); 
            // const userData = await getDoc(userCartData);
            const cartCollection = collection(db, 'Cart '+user.uid);
            const unsubscribe = onSnapshot(cartCollection, (snapshot) => {
                const newCartProducts = snapshot.docs.map((doc) => ({
                    ID: doc.id,
                    ...doc.data(),
                }));
                
                // Do something with the new cart products here
                setCartProducts(newCartProducts)
            });

            


        }
        else{
            console.log("user is not signed in")
        }
     })
        },[])
       
        
        
      //global variable
      let Product;


        //cart product increase function
     
        const cartProductIncrease=async(cartProduct)=>{

            
    
            console.log("data",cartProduct)
        Product=cartProduct;
        Product.qty=Product.qty + 1;
        Product.TotalProductPrice=Product.qty*Product.price;

        auth.onAuthStateChanged(async(user)=>{
            if(user){
                const cartProductRef = doc(db, 'Cart '+ user.uid, cartProduct.ID);
                const documentRef = doc(db, 'Cart '+ user.uid, cartProduct.ID);
                // console.log(cartProductRef);
                const existingData = await getDoc(cartProductRef);

                if (existingData.exists()) {
                    // Get the existing product data from the document
                    const product = existingData.data();
                
                    // Update the 'qty' and 'TotalProductPrice' fields
                    product.qty = product.qty + 1;
                    product.TotalProductPrice = product.qty * product.price;
                
                    // Update the document with the modified data
                    await updateDoc(cartProductRef, product,{ merge: true });
                    
                    console.log("Data updated successfully");
                } else {
                    console.log("Document does not exist");
                }

            }
            else{
                console.log("user is not logged in")
            }
        })
        }


        //cart product decrease

        const cartProductDecrease=(cartProduct)=>{
            Product=cartProduct;
            if(Product.qty > 1){
                auth.onAuthStateChanged(async(user)=>{
                    if(user){
                        const cartProductRef = doc(db, 'Cart '+ user.uid, cartProduct.ID);
                        const documentRef = doc(db, 'Cart '+ user.uid, cartProduct.ID);
                        // console.log(cartProductRef);
                        const existingData = await getDoc(cartProductRef);
        
                        if (existingData.exists()) {
                            // Get the existing product data from the document
                            const product = existingData.data();
                        
                            // Update the 'qty' and 'TotalProductPrice' fields
                            product.qty = product.qty - 1;
                            product.TotalProductPrice = product.qty * product.price;
                        
                            // Update the document with the modified data
                            await updateDoc(cartProductRef, product,{ merge: true });
                            
                            console.log("Data updated successfully");
                        } else {
                            console.log("Document does not exist");
                        }
        
                    }
                    else{
                        console.log("user is not logged in")
                    }
                })
            }
        }
        //getting qty from cartproducts in array
        const qty=cartProducts.map(cartProduct=>{
            return cartProduct.qty;
        })
        // console.log("qty",qty)
        //reducing qty in single value
        const reducerOfQty=(accumulator,currentValue)=>accumulator+currentValue;
        const totalQty=qty.reduce(reducerOfQty,0);
        // console.log("total is" ,totalQty)

        //getting total product price

        const price=cartProducts.map((cartProduct)=>{
            return cartProduct.TotalProductPrice;
        })
        //reducing price in single value
        const reducerOfPrice=(accumulator,currentValue)=>accumulator+currentValue;
        const totalPrice=price.reduce(reducerOfPrice,0);

        
         

  return (
   <>
   {cartProducts.length>0 &&(
    <div className='container-fluid'>
        <h1 className='text-center'>Cart</h1>
        <div className='products-box'>
            <CartProducts cartProducts={cartProducts} cartProductIncrease={cartProductIncrease}
            cartProductDecrease={cartProductDecrease} />
        </div>
        <div className='summary-box'>
  <h5>Cart Summary</h5>
  <br/>
  <div>
    Total No. of Products: <span>{totalQty}</span>
  </div>
  <div>
    Total Price to Pay :<span> ₹ {totalPrice}</span>
  </div>
  <br/>
  <StripeCheckout></StripeCheckout>
</div>
    </div>
   )}
   {cartProducts.length<1 && (
    <div className='container-fluid'>No products to show</div>
   )}
   </>
  )
}

export default Cart