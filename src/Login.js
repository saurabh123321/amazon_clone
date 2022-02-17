import React,{useState} from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom';
import {auth} from "./firebase";

function Login() {
    const history = useHistory(); 
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    
    const signIn = e => {
        e.preventDefault(); 

        //firebase stuff
        auth  
            .signInWithEmailAndPassword(email,password)
            .then(auth => {
                history.push('./')
            })
            .catch(error=> alert(error.message))
    }

    const register = e => {
        e.preventDefault(); 

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth)=>{
                //it successfully created a new user with email and password
                
                if(auth){
                    history.push('./')
                }
        })
        .catch(error => alert(error.message))

        //firebase register 

    }


  return (
    <div className='login'>

        <Link to='/'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
            className='login_logo'>
                
            </img>
        
        </Link>

        <div className='login_container'>
            <h1>Sign-In</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email}
                onChange={e=>setEmail(e.target.value)}></input>
                <h5>Password</h5>
                <input type='password' value={password}
                onChange={e=>setPassword(e.target.value)}></input>

                <button type='submit' className='login_signinButton' onClick={signIn}>Sign In</button>

            </form>

            <p>
                By signing-in you agree to the AMAZON FAKE CLONE conditions of use and sale. 
                Please see our Privacy Notice, our Cookies Notice and our 
                Interest-based ads Notice.
            </p>
            <button onClick={register} className='login_registerButton'>
                Create your Amazon Account
            </button>

        </div>
        

    </div>
  )
}

export default Login