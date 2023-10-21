import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/Config';
import { getDoc, doc, collection, getDocs, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import CartProducts from './CartProducts';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import MyOrder from './Order/MyOrder';



<ToastContainer
    autoClose={5000}
    hideProgressBar={true}

/>
function Cart({ user }) {
    const [userDetails, setUserDetails] = useState()
    let [cartitems, setCartItems] = useState([])
    let [ProductQTY, setProductQTY] = useState([])
    // let[ProductID,setProductID]=useState([])
    let ProductID = []
    let ProductQty = []

    //forr getting product id & name
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
// console.log("id",user.uid)
setUserDetails(user.uid)//for sending user's uid to backend
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    // console.log('Fetched data:', userData.id);


                } else {
                    console.log('No such document!');

                }

            }

        })
    })




    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {

                const userCollectionRef = collection(db, 'Cart ' + user.uid);
                const querySnapshot = await getDocs(userCollectionRef);

                querySnapshot.forEach((doc) => {
                    // Access individual documents here using doc.data()
                    // console.log("data",doc.id, ' => ', doc.data());
                    let data = doc.data();
                    ProductID.push(doc.id)
                    ProductQty.push(data.qty)

                    console.log(ProductQty, "ID")
                });

            }

        })
    })



    const history = useNavigate();

    console.log(cartitems, "gffg")
    //state of cart products

    const [cartProducts, setCartProducts] = useState([])
    //getting cart item from firestore



    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                // const userCartData = await getDocs(collection(db, 'cart '+user.uid)); 
                // const userData = await getDoc(userCartData);
                const cartCollection = collection(db, 'Cart ' + user.uid);
                const unsubscribe = onSnapshot(cartCollection, (snapshot) => {
                    const newCartProducts = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));

                    // Do something with the new cart products here
                    setCartProducts(newCartProducts)
                    setCartItems(newCartProducts)



                });




            }
            else {
                console.log("user is not signed in")
            }
        })
    }, [])



    //global variable
    let Product;


    //cart product increase function

    const cartProductIncrease = async (cartProduct) => {



        console.log("data", cartProduct)
        Product = cartProduct;
        Product.qty = Product.qty + 1;
        Product.TotalProductPrice = Product.qty * Product.price;

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const cartProductRef = doc(db, 'Cart ' + user.uid, cartProduct.ID);
                const documentRef = doc(db, 'Cart ' + user.uid, cartProduct.ID);
                // console.log(cartProductRef);
                const existingData = await getDoc(cartProductRef);

                if (existingData.exists()) {
                    // Get the existing product data from the document
                    const product = existingData.data();

                    // Update the 'qty' and 'TotalProductPrice' fields
                    product.qty = product.qty + 1;
                    product.TotalProductPrice = product.qty * product.price;

                    // Update the document with the modified data
                    await updateDoc(cartProductRef, product, { merge: true });

                    console.log("Data updated successfully");
                } else {
                    console.log("Document does not exist");
                }

            }
            else {
                console.log("user is not logged in")
            }
        })
    }


    //cart product decrease

    const cartProductDecrease = (cartProduct) => {
        Product = cartProduct;
        if (Product.qty > 1) {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const cartProductRef = doc(db, 'Cart ' + user.uid, cartProduct.ID);
                    const documentRef = doc(db, 'Cart ' + user.uid, cartProduct.ID);
                    // console.log(cartProductRef);
                    const existingData = await getDoc(cartProductRef);

                    if (existingData.exists()) {
                        // Get the existing product data from the document
                        const product = existingData.data();

                        // Update the 'qty' and 'TotalProductPrice' fields
                        product.qty = product.qty - 1;
                        product.TotalProductPrice = product.qty * product.price;

                        // Update the document with the modified data
                        await updateDoc(cartProductRef, product, { merge: true });

                        console.log("Data updated successfully");
                    } else {
                        console.log("Document does not exist");
                    }

                }
                else {
                    console.log("user is not logged in")
                }
            })
        }
    }
    //getting qty from cartproducts in array
    const qty = cartProducts.map(cartProduct => {
        return cartProduct.qty;
    })
    // console.log("qty",qty)
    //reducing qty in single value
    const reducerOfQty = (accumulator, currentValue) => accumulator + currentValue;
    const totalQty = qty.reduce(reducerOfQty, 0);
    // console.log("total is" ,totalQty)

    //getting total product price

    const price = cartProducts.map((cartProduct) => {
        return cartProduct.TotalProductPrice;
    })
    //reducing price in single value
    const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = price.reduce(reducerOfPrice, 0);


    const json = JSON.stringify(cartitems)
    console.log("json", json)

    let id = userDetails;

    //charging payment
    let ProductId = [];//array for storing successful order's product id
    const handleToken = async (token) => {


        const cart = { name: cartitems, totalPrice }
        const response = await axios.post('http://localhost:8080/checkout', {
            token,
            cart,
            user, id, ProductId, ProductQty, cartProducts
        })

        let { status } = response.data;
        let { order } = response.data

        if (status === 'success') {
            history('/')
            console.log(order, "carge")
            toast.success('Your order has been placed successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const cartCollection = collection(db, 'Cart ' + user.uid);

                    // Fetch all documents in the 'Cart {user.uid}' collection
                    const cartsSnapshot = await getDocs(cartCollection);
                    const documentIds = cartsSnapshot.docs.map((doc) => doc.id);
                    ProductId.push(documentIds);


                    const cartProductRef = doc(db, 'Orders', user.uid);
                    const existingData = await getDoc(cartProductRef);
                    if (existingData.exists()) {
                        // Get the existing product data from the document


                        // Update the document with the modified data
                        await updateDoc(cartProductRef, {
                            OrderId: ProductID
                        });

                        console.log("Data updated successfully");
                    } else {
                        console.log("Document does not exist");
                    }



                    // Iterate through the documents and delete them
                    for (const docRef of cartsSnapshot.docs) {
                        const cartDocRef = doc(db, 'Cart ' + user.uid, docRef.id);
                        await deleteDoc(cartDocRef)
                            .then(() => {
                                console.log('Document successfully deleted.');
                            })
                            .catch((error) => {
                                console.error('Error deleting document: ', error);
                            });


                    }



                }
                else {
                    console.log("user is not logged in")
                }
            })



        }
        else {
            alert('Something went wrong')
        }
    }


    //for payment using new stripe doc
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51NuEdsSH8i0IOWv3H4lHoRZIosQT0yraBQpCA2WNVGAHY3pWCUtRMlwY88bStOpKzZj63AnuPA7tNummvV4K5rCF00aLQTZTNe")

        const body = {
            products: cartProducts,id:id,totalQty:totalQty
        }
        const headers = {
            "Content-Type": "application/json"
        }
// for deployment & localhost ,there are two different endpoints

        const response=await fetch("https://ecom-backend-weld.vercel.app/create-checkout",
        // const response = await fetch("http://localhost:8080/create-checkout",
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })

        const session = await response.json()

        const result=stripe.redirectToCheckout({
            sessionId:session.id
        })

        if(result.error){
            console.log(result.error)
        }







    }



    return (
        <>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts} cartProductIncrease={cartProductIncrease}
                            cartProductDecrease={cartProductDecrease} />
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br />
                        <div>
                            Total No. of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                            Total Price to Pay :<span> ₹ {totalPrice}</span>
                        </div>
                        <br />
                        <button className='btn btn-primary' onClick={makePayment}>Procced to Pay</button>
                        {/* <StripeCheckout stripeKey='pk_test_51NuEdsSH8i0IOWv3H4lHoRZIosQT0yraBQpCA2WNVGAHY3pWCUtRMlwY88bStOpKzZj63AnuPA7tNummvV4K5rCF00aLQTZTNe' token={handleToken}
                            //   billingAddress='Jaora'

                            shippingAddress='jaora'
                            name='All Products'
                            amount={totalPrice * 100}
                        >

                        </StripeCheckout> */}
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            )}

        </>
    )
}

export default Cart