// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-41f02.firebaseapp.com",
  projectId: "insta-next-41f02",
  storageBucket: "insta-next-41f02.firebasestorage.app",
  messagingSenderId: "268826412532",
  appId: "1:268826412532:web:8557d23eafaa243be2a5a1",
  measurementId: "G-8PL7DGE4KN",
};

const app = initializeApp(firebaseConfig);

let analytics = null;

// ✅ Only initialize analytics in the browser
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };

// Firebase Storage Rules
// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if
//         request.resource.size < 2 *1024 * 1024 &&
//         request.resource.contentType.matches('image/.*')
//       }
//     }
//   }
