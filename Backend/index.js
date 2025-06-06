const express=require('express');
require('dotenv').config();
const cors=require("cors");
const path = require("path");
const stripeKey=process.env.stripeKey
const { v4: uuidv4 } = require('uuid');
const stripe=require('stripe')(stripeKey)
// const db=require("./src/config/Config.js")
const {initializeApp}=require('firebase/app')
const {getAuth}=require('firebase/auth')
const {getFirestore, collection, getDocs}=require('firebase/firestore')
const {getStorage}=require('firebase/storage')
const {doc,updateDoc,getDoc,arrayUnion,setDoc}=require('firebase/firestore')


// Allow requests from your frontend URL
// const allowedOrigins = ['https://ecom2-c701c.web.app'];



const firebaseConfig = {
    apiKey:process.env.apiKey ,
    authDomain:process.env.authDomain ,
    projectId:process.env.projectId ,
    storageBucket:process.env.storageBucket ,
    messagingSenderId:process.env.messagingSenderId ,
    appId:process.env.appId ,
    measurementId:process.env.measurementId 
  };

const app=express();
app.use(cors());
app.use(express.json());



const fb = initializeApp(firebaseConfig);

const auth=getAuth();
const db = getFirestore(fb);
const storage = getStorage(fb);


app.get("/", (req, res) => {
 res.json('stripeKey')
});
app.get('/test',(req,res)=>{
  res.send('test')
})

// using promises 
// endpoint for order creation
app.post('/create-checkout', async (req, res) => {
  let order = [];
  let userName, userEmail, userPhone;
  const { products, id, totalQty } = req.body;

  try {
      const userDocRef = doc(db, 'users', id);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
          throw new Error('No user document found!');
      }

      const userData = userDoc.data();
      userName = userData.name;
      userEmail = userData.email;
      userPhone = userData.phone;

      const lineItems = products.map((product) => ({
          price_data: {
              currency: "inr",
              product_data: { name: product.name },
              unit_amount: product.price * 100,
          },
          quantity: product.qty,
      }));

      const currentdate = new Date();
      const datetime = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;

      const sessionData = {
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: 'http://localhost:3000/myorder',
          cancel_url: 'http://localhost:3000/products',
          metadata: {
              products: JSON.stringify(products.map(p => p.ID)),
              quantity: JSON.stringify(totalQty),
              productName: JSON.stringify(products.map(p => p.name)),
              Date: datetime,
              UID: id,
              CustomerName: userName,
              CustomerEmail: userEmail,
              CustomerPhone: userPhone,
          }
      };

      const session = await stripe.checkout.sessions.create(sessionData);
      res.json({ id: session.id });

      const cartProductRef = doc(db, 'Orders', id);
      const existingOrderDoc = await getDoc(cartProductRef);

      if (existingOrderDoc.exists()) {
          await updateDoc(cartProductRef, {
              Orders: arrayUnion(session),
          });
      } else {
          await setDoc(cartProductRef, {
              Orders: [session],
          });
      }

      await updateDoc(userDocRef, {
          OrderId: arrayUnion(session.id),
      });
  } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).send('Internal Server Error');
  }
});






app.get('/orderDetails2',async(req,res,orderId)=>{
  const { id } = req.query;
console.log("cart",id);
let orderIds;
const userDocRef = doc(db, 'users', id);
const userDoc = await getDoc(userDocRef);
if (userDoc.exists()) {
    const userData = userDoc.data();
    // console.log('Fetched data:', userData.id);
    orderIds=userData.OrderId
    console.log('id',orderIds)
    console.log('triggered')




} else {
    console.log('No such document!');

}
if(orderIds){

const retrieveOrderDetails = async (orderId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(orderId);
    return session; // You can return the session or any specific data you need
  } catch (error) {
    console.error(`Error retrieving order details for ${orderId}:`, error);
    return null;
  }
};

let orderData=[];
// Use Promise.all with map to fetch order details for all order IDs concurrently
try{
const fetchOrderDetails = async () => {
  const orderDetails = await Promise.all(orderIds.map(retrieveOrderDetails));

  // orderDetails is an array of order details for each order ID
  console.log(orderDetails);
  orderData.push(orderDetails)

  
if(orderData){
  
  const orderDocRef=doc(db, 'Orders', id);
  (async () => {
    try {
      await setDoc(orderDocRef, { Orders: orderDetails }, { merge: true });
      console.log('Array replaced successfully.');
    } catch (error) {
      console.error('Error replacing array:', error);
    }
  })();

}

else{
  console.log("not found")
}

  // You can process the order details here
};

// Call the function to fetch order details
fetchOrderDetails();}catch(error){
  res.json('error')
}
}else{
  console.log('user has not ordered anything')
}
})








app.listen(8080,()=>{
    console.log("running")
})