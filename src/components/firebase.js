// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAoBfqBp3GKkGnN3AwaVEW-4xN4BzduIkE",
  authDomain: "medicinal-plant-detectio-99a9c.firebaseapp.com",
  projectId: "medicinal-plant-detectio-99a9c",
  storageBucket: "medicinal-plant-detectio-99a9c.firebasestorage.app",
  messagingSenderId: "191623698549",
  appId: "1:191623698549:web:9ea98c4b0f8c58f486c03c",
  measurementId: "G-QGNP72J0QN"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);
export { db, database,auth };
