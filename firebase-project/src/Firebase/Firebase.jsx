
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use


const firebaseConfig = {
  apiKey: "AIzaSyCgRTN_Aw7ZqriP4H8001n_JuctY3tWO6E",
  authDomain: "blogsite-65bfb.firebaseapp.com",
  projectId: "blogsite-65bfb",
  storageBucket: "blogsite-65bfb.appspot.com", 
  messagingSenderId: "902213415319",
  appId: "1:902213415319:web:de687823f1f5d9923a14d2",
  measurementId: "G-FTH7E2P8YN",
  databaseURL :" https://blogsite-65bfb-default-rtdb.firebaseio.com",

};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
