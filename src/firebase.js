// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// import { getFirestore } from 'firebase/firestore/lite';


import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCLCZ-QdMVoQyxb2KpfwZ3jOEjYMh1VfkA",
    authDomain: "challenge-2700d.firebaseapp.com",
    projectId: "challenge-2700d",
    storageBucket: "challenge-2700d.appspot.com",
    messagingSenderId: "1081186618214",
    appId: "1:1081186618214:web:4aa4b376cbe41cb3d396a7",
    measurementId: "G-L37HYQP5DF"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig); 

  const db = firebaseApp.firestore(); 
  const auth = firebase.auth(); 

  export {db, auth}; 