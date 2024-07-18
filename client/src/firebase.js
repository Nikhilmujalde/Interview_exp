// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interview-exp.firebaseapp.com",
  projectId: "interview-exp",
  storageBucket: "interview-exp.appspot.com",
  messagingSenderId: "282143558644",
  appId: "1:282143558644:web:974a285e6606bf6febc7a1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, auth };

