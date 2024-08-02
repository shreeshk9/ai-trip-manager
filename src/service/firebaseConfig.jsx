// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE6_lkol0ay2mOVr-z59-51tFSu6W1q_4",
  authDomain: "ai-travel-planner-a4774.firebaseapp.com",
  projectId: "ai-travel-planner-a4774",
  storageBucket: "ai-travel-planner-a4774.appspot.com",
  messagingSenderId: "41791288679",
  appId: "1:41791288679:web:f3e428e9bb31cd4e85ebc2",
  measurementId: "G-ZH5KC2PPVL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app); // Uncomment if you plan to use analytics
