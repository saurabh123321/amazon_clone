import React, {useState, useEffect} from 'react'
import './Payment.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'; 
import CurrencyFormat from 'react-currency-format';
import axios from './axios';

function Payment() {
     
    const [{basket, user}, dispatch] = useStateValue(); 
    const history = useHistory(); 
    const stripe = useStripe(); 
    const elements = useElements(); 

    const [succeeded, setSucceeded] = useState(false); 
    const [processing, setProcessing] = useState(""); 

    const [error, setError] = useState(null); 
    const [disabled, setDisabled] = useState(true); 

    const [clientSecret, setClientSecret] = useState(true); 

    useEffect(()=>{
        //generate the special stripe secret which allowsus to charge a customer
        const getClientSecret = async () =>{
            const respose = await axios({
                metho: 'post',
                //stripe expects the total in currencies subunits. 
                url: '/payments/create?total = ${getBasketTotal(basket)*100}'
            });
            setClientSecret(respose.data.clientSecret)
        }
    },[basket])
 
    const handleSubmit = async(event) => {
        //do all the stripe stuff
        event.preventDefault(); 
        setProcessing(true); 



        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent = payment confirmation
            setSucceeded(true); 
            setError(null); 
            setProcessing(false); 

            history.replaceState('/orders')
        })


    }
    const handlechange = event => {
        //listen for changes in the cardElement
        //and display any errors as the customer types their card details 
        setDisabled(event.empty()); 
        setError(event.error? event.error.message: " "); 
    }

  return (
    <div className='payment'>
        

        <div className='payment_container'>
            <h1>
                Checkout {<Link to="/checkout">{basket?.length} items</Link>}

            </h1>
            {/* Payment section - dilivery action */}
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment_address'>
                    <p>{user?.email}</p>
                    <p>123, React plane</p>
                    <p>Maharashtra, India</p>

                </div>
            </div>

            {/* Payment section - review */}
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Review items and delivery</h3>

                </div>
                <div className='payment_items'>
                    {basket.map(item=>(
                        // reusing the product component here aswell 
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}>


                        </CheckoutProduct>
                        ))}

                </div>
            </div>


            {/* Payment section - payment method */}
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment_details'>
                    {/* All stripe method will go here */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handlechange}></CardElement>
                        <div className='payment_priceContainer'>
                        <CurrencyFormat
                            renderText={(value) =>(
                                <h3>Order Total: {value}</h3>
                            )}
                            decimalScale={2}
                            value={getBasketTotal(basket)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₹ "}
                    
                            />

                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>

                        </div>
                        {/* Error */}
                        {error && <div>{error}</div>}

                    </form>
                </div>

            </div>
        </div>  
    </div>
  )
}

export default Payment