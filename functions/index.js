const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require('express'); 

const cors = require('cors'); 

const stripe = require('striipe')('sk_test_51KTIxRSFFIjRgKyryqP96ILqYNCu2bcJWoi9DXxxAr1WncZFtf2XfvIrlI3e10XOcbgN2VQGBlwLHIgS57OQpxRk00evQE2nNG')

//API


//App config 
const app = express(); 


//middelwares 
app.use(cors({origin:true}));
app.use(express.json()); 


//API routes
app.get('./', (request, response) => response.status(200).send('Hello World'));

app.post('/payments/create', async(request, respose)=>{
    const total = request.query.total; 
    console.log('Payment request recieved!! for this amout', total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total,
        currency: "INR",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret, 
    })

})


//Listen command

exports.api = functions.https.onRequest(app); 