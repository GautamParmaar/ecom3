const express=require('express')
const stripe=require('stripe')('sk_test_51NuEdsSH8i0IOWv3rBuz9dY785hElk1BzfxmzjNjbYFZAUdZxFwmtqnDOJehlaIdB6bqyBMbpZC2FaqiZ3WSAVBU00v9WZPHkn')
const bodyparser=require('body-parser')
const app=express()

const endpointSecret = "whsec_96f488454001134817ffe4a2888467ad01484cafe6d298497cf0b96de34bd892";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("web hook verified")
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242,()=>{
console.log("rumming")
})