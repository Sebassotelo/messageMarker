// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrEicTxaOqFx5GlOk6H0wfFruA6bms90M",
  authDomain: "twitch-4c563.firebaseapp.com",
  projectId: "twitch-4c563",
  storageBucket: "twitch-4c563.appspot.com",
  messagingSenderId: "268329425031",
  appId: "1:268329425031:web:b8d3caae5153e224040022",
  measurementId: "G-20226WNXMP",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
