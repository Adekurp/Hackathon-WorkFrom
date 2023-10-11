// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "workfrom-39062.firebaseapp.com",
  projectId: "workfrom-39062",
  storageBucket: "workfrom-39062.appspot.com",
  messagingSenderId: "1041547146615",
  appId: "1:1041547146615:web:443b59014b7b556d919d72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);