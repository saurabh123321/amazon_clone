import React,{useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from './Checkout'; 
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'


const promise = loadStripe('pk_test_51KTIxRSFFIjRgKyrd5AUJ8s3cQyhxlVsIyl7r9akfk9KWQFR3QT4bRhIbVvKO4Ge3Xl0atDz726YO3AMBIIWmARA00ql5xfx3b');


function App() {
  const [{}, dispatch] = useStateValue(); 

  useEffect(() => {
    //wiill only run once when the app component loads.
    auth.onAuthStateChanged(authUser =>{
      console.log("The user is >>>", authUser);

      if(authUser){
        //the user just logged in / the user was logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })


      }else{
        //the uer is logged out 
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])


  return (

    <Router>
    <div className="App">
    
      

      <Switch>
        <Route path="/login">         
          <Login></Login>                   
        </Route>  
        <Route path="/checkout">
            <Header> </Header>            
            <Checkout> </Checkout>                   
        </Route>  
        <Route path="/payment">
            <Header></Header>
            {/* <h1>Hey, i am in payment part</h1> */}
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
            
             

        </Route>  
        <Route path="/">
            <Header/>            
            <Home/>            
        </Route>  
             
      </Switch>

    </div>
    </Router>

  );
}

export default App;
