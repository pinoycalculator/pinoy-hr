// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAl_QoL8em5Y8Qk8MV1xP5C6y7Ro2gf0Y",
  authDomain: "pinoy-hr.firebaseapp.com",
  projectId: "pinoy-hr",
  storageBucket: "pinoy-hr.firebasestorage.app",
  messagingSenderId: "18373237563",
  appId: "1:18373237563:web:cd4b29867e285d37df751e",
  measurementId: "G-JGBDBNHE9Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
