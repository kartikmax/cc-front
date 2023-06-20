import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXkHWgBfKmH_6s7rsqJWDUH-DmR-CCMX4",
  authDomain: "cc-backend-cc98f.firebaseapp.com",
  projectId: "cc-backend-cc98f",
  storageBucket: "cc-backend-cc98f.appspot.com",
  messagingSenderId: "63669846447",
  appId: "1:63669846447:web:2a8066de8c32028060ef5a",
  measurementId: "G-55J5WJQ5MD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
