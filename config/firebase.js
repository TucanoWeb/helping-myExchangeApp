import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7TuKhjFQxMDnD7cQFz8q9tisfdxZH12w",
  authDomain: "myexchangeapp-1e10c.firebaseapp.com",
  projectId: "myexchangeapp-1e10c",
  storageBucket: "myexchangeapp-1e10c.appspot.com",
  messagingSenderId: "477220287450",
  appId: "1:477220287450:web:f16511e64de87a528a86e3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}