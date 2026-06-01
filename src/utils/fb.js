// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7y4AvP-Uo39DPDvKwUYd1CKGgLvM9UAs",
  authDomain: "form-maker-ffe36.firebaseapp.com",
  projectId: "form-maker-ffe36",
  storageBucket: "form-maker-ffe36.firebasestorage.app",
  messagingSenderId: "387469576198",
  appId: "1:387469576198:web:78e7e6ac765445c6a99b87",
  measurementId: "G-NNL7RQ324M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

const analytics = getAnalytics(app);