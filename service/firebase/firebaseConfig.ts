// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA87DO6A1vl2V7CYwFj8ACqLB2ZuvVSSrA",
  authDomain: "retinopathy-97006.firebaseapp.com",
  projectId: "retinopathy-97006",
  storageBucket: "retinopathy-97006.appspot.com",
  messagingSenderId: "578905433992",
  appId: "1:578905433992:web:4e4071fe294dcf3cc67c3d",
  measurementId: "G-95N4N2F566"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
