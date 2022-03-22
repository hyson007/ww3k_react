// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKJzze7fh1ABk8yuiJ9r37JdZ6kr9XsLM",
  authDomain: "wordwise3000.firebaseapp.com",
  databaseURL: "https://wordwise3000-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wordwise3000",
  storageBucket: "wordwise3000.appspot.com",
  messagingSenderId: "180758900258",
  appId: "1:180758900258:web:2d7ce78724a9c86517a47b",
  measurementId: "G-X1JZ7WM6V5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();