// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCokxfR6w5cf9ZEW9jp0dk8AUUn2y6ft2E",
    authDomain: "react-curso-2b9b4.firebaseapp.com",
    projectId: "react-curso-2b9b4",
    storageBucket: "react-curso-2b9b4.appspot.com",
    messagingSenderId: "702455399466",
    appId: "1:702455399466:web:cb0cf872642e9a0c856f53"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

