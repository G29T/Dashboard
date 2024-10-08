import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDgH5Wnjp-7XYa6IGGWMkoV6eOoK3s--Nc",
    authDomain: "frvr-e12a9.firebaseapp.com",
    projectId: "frvr-e12a9",
    storageBucket: "frvr-e12a9.appspot.com",
    messagingSenderId: "856547319855",
    appId: "1:856547319855:web:ac7bfdf92a1b20a323a6da",
    measurementId: "G-GXEK0S91T5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
