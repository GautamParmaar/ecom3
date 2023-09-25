import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAUBHe6WP3wwKYtOUY4E9O3yPfdXHpdjOw",
    authDomain: "ecom2-c701c.firebaseapp.com",
    projectId: "ecom2-c701c",
    storageBucket: "ecom2-c701c.appspot.com",
    messagingSenderId: "182447993826",
    appId: "1:182447993826:web:d2316f1a96c6f09a24ffbb",
    measurementId: "G-PL4SE4E9ZH"
  };

  const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage


export {app,auth,db,storage};