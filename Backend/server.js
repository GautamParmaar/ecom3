const express=require('express');
const cors=require("cors");
const { v4: uuidv4 } = require('uuid');
const stripe=require('stripe')('sk_test_51NuEdsSH8i0IOWv3rBuz9dY785hElk1BzfxmzjNjbYFZAUdZxFwmtqnDOJehlaIdB6bqyBMbpZC2FaqiZ3WSAVBU00v9WZPHkn')
// const db=require("./src/config/Config.js")
const {initializeApp}=require('firebase/app')
const {getAuth}=require('firebase/auth')
const {getFirestore}=require('firebase/firestore')
const {getStorage}=require('firebase/storage')
const {doc,updateDoc,getDoc,arrayUnion,setDoc}=require('firebase/firestore')


const firebaseConfig = {
    apiKey: "AIzaSyAUBHe6WP3wwKYtOUY4E9O3yPfdXHpdjOw",
    authDomain: "ecom2-c701c.firebaseapp.com",
    projectId: "ecom2-c701c",
    storageBucket: "ecom2-c701c.appspot.com",
    messagingSenderId: "182447993826",
    appId: "1:182447993826:web:d2316f1a96c6f09a24ffbb",
    measurementId: "G-PL4SE4E9ZH"
  };

const app=express();
app.use(cors());
app.use(express.json());

const fb = initializeApp(firebaseConfig);

const auth=getAuth();
const db = getFirestore(fb);
const storage = getStorage(fb);


app.get('/',(req,res)=>{
    res.send("welcome")
})

app.post('/checkout',async(req,res)=>{
    let error;
    let status;
    let order=[]
    let productNames=[]

    
    try{
        const {cart,token,user,id,cartProducts}=req.body;
        console.log("cart",cartProducts)
        const metaData=cartProducts.map((cartproduct)=>{
          {
            productName: cartproduct.name
          }
        })
        
      
        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        })
        const key=uuidv4();
        const charge=await stripe.paymentIntents.create({
            amount:cart.totalPrice*100,
            currency:'inr',
            customer:customer.id,
            receipt_email:token.email,
            description:"null",
            

            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip

                }
               
            },
            metaData
          
        },{idempotencyKey:key})
        console.log(charge.metadata)

        status="success"
        order.push(charge.id);
        const cartProductRef = doc(db, 'users', user.uid);
        const existingData = await getDoc(cartProductRef);
       if (existingData.exists()) {
                            // Get the existing product data from the document
                            const product = existingData.data();
                        
                            // Update the 'qty' and 'TotalProductPrice' fields
                            product.OrderId = order;
                        
                            // Update the document with the modified data
                            await updateDoc(cartProductRef,{
                                OrderId: arrayUnion(charge.id)
                            });

  // for putting order id into user database
            //                  const orderIds = []; // Replace with your order IDs
            // const userDocRef = doc(db, 'users', id);
            // const userDoc = await getDoc(userDocRef);
            // if (userDoc.exists()) {
            //   // Document data exists, you can access it using .data() method
            //   const userData = userDoc.data();
            //   orderIds.push(...userData.OrderId)
            //   console.log('Fetched data:', userData.OrderId);
            //   console.log(orderIds)
             
            // } else {
            //   console.log('No such document!');
            //   return null;
            // }


                            
                            console.log("Data updated successfully");
                        } else {
                            console.log("Document does not exist");
                        } 

        console.log(charge.id)
    }catch(error){
        console.log(error)
        status="error"
    }
    res.json({status})
})

app.get('/orderDetails',async(req,res)=>{
               const { id } = req.query;
            console.log("cart",id)
            let orderData;

//code for getting product id
            const orderIds = []; // Replace with your order IDs
            const userDocRef = doc(db, 'users', id);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              // Document data exists, you can access it using .data() method
              const userData = userDoc.data();
              orderIds.push(...userData.OrderId)
              console.log('Fetched data:', userData.OrderId);
              console.log(orderIds)
             
            } else {
              console.log('No such document!');
              return null;
            }


            const paymentIntents = [];

            // Use map to fetch payment intents for each order ID
            const fetchPaymentIntentsSequentially = async () => {
              for (const orderId of orderIds) {
                try {
                  const paymentIntent = await retrievePaymentIntent(orderId);
                  paymentIntents.push(paymentIntent);

                  const docRef = await setDoc(doc(db, "Orders", id), {
                    uid:id,
                    paymentIntents
              });
              console.log("Document written with ID: ");
                } catch (error) {
                  console.error(`Error fetching payment intent for order ID ${orderId}: ${error.message}`);
                }
              }
            
              console.log('Payment Intents:', paymentIntents);
              // Handle payment intents data as needed
            };
            
            // Function to retrieve a payment intent by ID
            const retrievePaymentIntent = async (paymentIntentId) => {
              return new Promise((resolve, reject) => {
                stripe.paymentIntents.retrieve(paymentIntentId, (err, paymentIntent) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(paymentIntent);
                  }
                });
              });
            };
            
            // Rest of your code
            
            // Call the fetchPaymentIntentsSequentially function to retrieve and process payment intents
            fetchPaymentIntentsSequentially();

// console.log(transaction)
// orderData=paymentIntents;
// res.json({orderData})

})





app.listen(8080,()=>{
    console.log("running")
})