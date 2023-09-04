import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2PTCMXQ82guBSCSB3dVB_7Kcm9pSsF2c",
  authDomain: "awn-anw-7ad59.firebaseapp.com",
  databaseURL: "https://awn-anw-7ad59-default-rtdb.firebaseio.com",
  projectId: "awn-anw-7ad59",
  storageBucket: "awn-anw-7ad59.appspot.com",
  messagingSenderId: "140582882046",
  appId: "1:140582882046:web:82cc312df065ada031b3af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };