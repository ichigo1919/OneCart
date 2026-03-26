import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBPpMS-UKsieJdZeX-Exsl7zfqC7iN4yZI" ,
  authDomain: "ecommercewebsite-9468c.firebaseapp.com",
  projectId: "ecommercewebsite-9468c",
  storageBucket: "ecommercewebsite-9468c.firebasestorage.app",
  messagingSenderId: "528212345551",
  appId: "1:528212345551:web:5328594d620e23f628edba"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

