import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAFPutqcvbFfk2haKHq7Fib_6CGsBqIiQ",
  authDomain: "awn-anw-web-app.firebaseapp.com",
  projectId: "awn-anw-web-app",
  storageBucket: "awn-anw-web-app.appspot.com",
  messagingSenderId: "1069197651048",
  appId: "1:1069197651048:web:68f1677e3326f1f5ad9fdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };