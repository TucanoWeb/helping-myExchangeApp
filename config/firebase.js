import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyg3VcXEpPugt9HutUDyTfe5OBnJ5PLB8",
  authDomain: "myexchange-b2d22.firebaseapp.com",
  projectId: "myexchange-b2d22",
  storageBucket: "myexchange-b2d22.appspot.com",
  messagingSenderId: "67656550212",
  appId: "1:67656550212:web:a278bb9bf51bf397b87911"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}