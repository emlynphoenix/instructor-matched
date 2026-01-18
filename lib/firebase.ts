import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration provided by user
const firebaseConfig = {
  apiKey: "AIzaSyCjSrzgWuZK1lCJUTnBYhrTiufrElNZW1Q",
  authDomain: "instructor-matched-1b62b.firebaseapp.com",
  projectId: "instructor-matched-1b62b",
  storageBucket: "instructor-matched-1b62b.firebasestorage.app",
  messagingSenderId: "593479655627",
  appId: "1:593479655627:web:a12fd13086f2c1bc1f7b4e",
  measurementId: "G-BWZG57HNKF"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// 👇 re-export auth helpers
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};

