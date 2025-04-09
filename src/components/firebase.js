// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCkW5aNsQwfcl9a6QZTVG1GKpW6FfW8CPI",
    authDomain: "student-management-f793a.firebaseapp.com",
    projectId: "student-management-f793a",
    storageBucket: "student-management-f793a.appspot.com",
    messagingSenderId: "820420097518",
    appId: "1:820420097518:web:9a3ff0cb8c5b3d7fc24aff",
    measurementId: "G-38FTZ6ZQ53"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);
export { db, database,auth };
