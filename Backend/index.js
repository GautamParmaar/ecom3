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

// // Allow requests from your frontend URL
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   })
// );

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
app.post('/create-checkout', (req, res) => {
  let order = [];
  let userName;
  let userEmail;
  let userPhone;
  let userAddress;
  const { products, id, totalQty } = req.body;

  const userDocRef = doc(db, 'users', id);

  getDoc(userDocRef)
    .then((userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        userName = userData.name;
        userEmail = userData.email;
        userPhone = userData.phone;
      } else {
        console.log('No such document!');
      }

      const lineItems = products.map((product) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
          customer_details: product.id,
        },
        quantity: product.qty,
        customer_details: product.id,
      }));

      const productID = [];
      products.forEach((product) => {
        productID.push(product.ID);
      });

      const metadata = {
        'productID': JSON.stringify(products),
      };
      var currentdate = new Date();
      var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();

      const data = [];
      const nameOfProducts = [];
      let qtyData;
      products.map((product) => {
        data.push(product.ID);
        nameOfProducts.push(product.name);
        qtyData = product.qty;
      });

      const sessionData = {
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: 'https://ecom2-c701c.web.app/myorder',
        cancel_url: 'https://ecom2-c701c.web.app/myorder',
        metadata: {
          products: JSON.stringify(data),
          quantity: JSON.stringify(totalQty),
          productName: JSON.stringify(nameOfProducts),
          Date: datetime,
          lineItems: JSON.stringify(lineItems),
          UID: id,
          CustomerName: JSON.stringify(userName),
          CustomerEmail: JSON.stringify(userEmail),
          CustomerPhone: JSON.stringify(userPhone),
        }
      };

      stripe.checkout.sessions.create(sessionData)
        .then((session) => {
          res.json({ id: session.id });
          order.push(session.id);

          const orderIds = [];
          orderIds.push(session.id);

          const cartProductRef = doc(db, 'Orders', id);
          getDoc(cartProductRef)
            .then((existingData) => {
              if (existingData.exists()) {
                return updateDoc(cartProductRef, {
                  Orders: arrayUnion(session),
                }).then(() => {
                  console.log('data has been inserted into Orders collection');
                });
              } else {
                return setDoc(doc(db, 'Orders', id), {
                  Orders: [session],
                }).then(() => {
                  console.log('Data has been created');
                });
              }
            })
            .then(() => {
              // Now we handle the user document update
              const userDocRef = doc(db, 'users', id);
              return getDoc(userDocRef)
                .then((existingData) => {
                  if (existingData.exists()) {
                    return updateDoc(userDocRef, {
                      OrderId: arrayUnion(session.id),
                    }).then(() => {
                      console.log('id updated');
                    });
                  }
                });
            })
            .catch((error) => {
              console.error('Error updating document: ', error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

// 

// using async await
// app.post('/create-checkout',async(req,res)=>{
//   let order=[]
//   let userName;
//   let userEmail;
//   let userPhone;
//   let userAddress;
// const {products,id,totalQty}=req.body;

//  const userDocRef = doc(db, 'users', id);
//     const userDoc = await getDoc(userDocRef);
//     if (userDoc.exists()) {
//       // Document data exists, you can access it using .data() method
//       const userData = userDoc.data();
     
//       userName=userData.name;
//       userEmail=userData.email
//       userPhone=userData.phone
      
      
      
//     } else {
//       console.log('No such document!');
     
//     }

// const lineItems= await products.map((products)=>({
//   price_data:{
//     currency:"inr",
//     product_data:{
//       name:products.name,
      
//     },
//     unit_amount:products.price*100,
//     customer_details:products.id,

//   },
//   quantity:products.qty,
//   customer_details:products.id,
// }))

//   const productID=[];
//   products.forEach((product) => {
//     productID.push(product.ID);
//   });
//   const metadata = {
//     'productID': JSON.stringify(products),
//   };
//   var currentdate = new Date(); 
//   var datetime = currentdate.getDate() + "/"
//                   + (currentdate.getMonth()+1)  + "/" 
//                   + currentdate.getFullYear() 
  
// try{
//   const data=[]
//   const nameOfProducts=[]
//   let qtyData;
// products.map((products)=>{
//   data.push(products.ID)
//   nameOfProducts.push(products.name)
//   qtyData=products.qty
//   // console.log(data)
// })


// // console.log(products,"hello")
// const session=await stripe.checkout.sessions.create({
//   payment_method_types:["card"],
//   line_items:lineItems,
//   mode:"payment",
//   // success_url:'http://localhost:3000/',
//   success_url:'https://ecom2-c701c.web.app/myorder',
//   // cancel_url:"http://localhost:3000/cart",
//   cancel_url:"https://ecom2-c701c.web.app/myorder",
//   metadata : {
//     products:JSON.stringify(data),
//     quantity :JSON.stringify(totalQty),
//     productName:JSON.stringify(nameOfProducts),
//     Date:datetime,
//     lineItems:JSON.stringify(lineItems),
//     UID:id,
//     CustomerName:JSON.stringify(userName),
//     CustomerEmail:JSON.stringify(userEmail),
//     CustomerPhone:JSON.stringify(userPhone)
//     // customer id is UID
//   }

// })
// res.json({id:session.id})


// order.push(session.id)




// //code for inserting order id into user's database
// const orderIds = [];
// orderIds.push(session.id)


// const cartProductRef = doc(db, 'Orders', id);
// const existingData = await getDoc(cartProductRef);
// if(existingData.exists()){
//   await updateDoc(cartProductRef, {
//     Orders: arrayUnion(session),
//   });
//   console.log('data has been inserted into Orders collection')

// }


// else{
// await setDoc(doc(db, "Orders", id), {
// Orders: [session],


// });
// console.log("Data has been created");
// }
//  // Replace with your order IDs
// try {
//   const userDocRef = doc(db, 'users', id);

//   const existingData = await getDoc(userDocRef);
//   if (existingData.exists()) {
//     // Get the existing product data from the document


//     // Update the document with the modified data
//     await updateDoc(userDocRef, {
//         OrderId: arrayUnion(session.id),
        
        
//     });
//     console.log('id updated')
   


   
// } else {
  
// }
// } catch (error) {
//   console.error('Error updating document: ', error);
// }



// //for inserting order details in order database ,document id will be user uid








// }
// catch(error){
//   console.log(error)
// }


// })

app.post('/checkout',async(req,res)=>{
    let error;
    let status;
    let order=[]
    let productNames=[]

    
    try{
        const {cart,token,user,id,Products}=req.body;
        console.log("cart",Products)
      

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
              // console.log('Fetched data:', userData.OrderId);
              // console.log(orderIds)
             
            } else {
              console.log('No such document!');
              return null;
            }


            const paymentIntents = [];

            // Use map to fetch payment intents for each order ID
            const fetchPaymentIntentsSequentially = async () => {
              for (const orderId of orderIds) {
                try {
                  const paymentIntent = await retrievePaymentIntent('cs_test_b1riX13bwreSi7YqRTaLxJh6UWNgZI9UcSH3vt9jL05gujVyidf5CIEXQy');
                  paymentIntents.push(paymentIntent);
                  console.log(paymentIntents,"payment");


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



app.get('/orderDetails2',async(req,res,orderId)=>{
  const { id } = req.query;
console.log("cart",id)
let orderIds
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


app.get('/trial',(req,res)=>{
  const ordersCollection = collection(db, 'Orders');
let ordersData
    // Fetch all documents from the collection
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(ordersCollection);
         ordersData = [];

        querySnapshot.forEach((doc) => {
          // Store the data
          ordersData.push({ ...doc.data() });
        });
          console.log(ordersData)

        

       
        // console.log(ordersData,"orders")
       
     
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };
    fetchData();

    

   

   
    res.send('ok')
})





app.listen(8080,()=>{
    console.log("running")
})