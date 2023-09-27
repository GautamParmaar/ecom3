const express=require('express');
const cors=require("cors");
const { v4: uuidv4 } = require('uuid');
const stripe=require('stripe')('sk_test_51NuEdsSH8i0IOWv3rBuz9dY785hElk1BzfxmzjNjbYFZAUdZxFwmtqnDOJehlaIdB6bqyBMbpZC2FaqiZ3WSAVBU00v9WZPHkn')

const app=express();
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("welcome")
})

app.post('/checkout',async(req,res)=>{
    let error;
    let status;
    try{
        const {cart,token}=req.body;
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
            description:'product details',
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip

                }
            }
        },{idempotencyKey:key})

        status="success"
        console.log(charge)
    }catch(error){
        console.log(error)
        status="error"
    }
    res.json({status})
})


app.listen(8080,()=>{
    console.log("running")
})