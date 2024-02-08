// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7TuKhjFQxMDnD7cQFz8q9tisfdxZH12w",
    authDomain: "myexchangeapp-1e10c.firebaseapp.com",
    projectId: "myexchangeapp-1e10c",
    storageBucket: "myexchangeapp-1e10c.appspot.com",
    messagingSenderId: "477220287450",
    appId: "1:477220287450:web:f16511e64de87a528a86e3"
  };

// these keys won't work because i've removed the app from firebase
// add your app on firebase, copy firebaseConfig here, enable email/password auth
// and test the app ;)

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);