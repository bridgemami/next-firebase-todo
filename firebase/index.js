//import the functions you nedd from SDKs you need
import { initializeApp } from "firebase/app";

//TODO: Add SDKs for Firebase products that you want to  see
//https://firebase.google.com/docs/wev/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "cs55-module7.firebaseapp.com",
    projectId: "cs55-module7",
    storageBucket: "cs55-module7.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect for Authentication
const auth = getAuth(app);
// connect to Firebase DB
const db = getFirestore(app);

export { auth, db };