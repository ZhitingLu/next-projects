// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-50126.firebaseapp.com",
  projectId: "x-next-50126",
  storageBucket: "x-next-50126.firebasestorage.app",
  messagingSenderId: "906158445",
  appId: "1:906158445:web:9f3092f28b5369652b3a64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);