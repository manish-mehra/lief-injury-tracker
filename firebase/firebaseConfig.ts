// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBdiz1Oc2O3MeHSvX_YfBY_ssEurJr0OM",
  authDomain: "lief-injury-tracker.firebaseapp.com",
  projectId: "lief-injury-tracker",
  storageBucket: "lief-injury-tracker.appspot.com",
  messagingSenderId: "368567672861",
  appId: "1:368567672861:web:2e1aabf859cb5f551466f4",
  measurementId: "G-E365VHFTQC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
