//import the functions you nedd from SDKs you need
import { initializeApp } from "firebase/app";

//TODO: Add SDKs for Firebase products that you want to  see
//https://firebase.google.com/docs/wev/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkuqmRTKDVSiD0D0nMPmeIUUCRma9Q-uE",
    authDomain: "cs55-module7.firebaseapp.com",
    projectId: "cs55-module7",
    storageBucket: "cs55-module7.appspot.com",
    messagingSenderId: "351907170578",
    appId: "1:351907170578:web:6b87cd97ccdb9b84eccbcb"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect for Authentication
const auth = getAuth(app);
// connect to Firebase DB
const db = getFirestore(app);

export { auth, db };