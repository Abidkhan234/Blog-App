import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js'
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, getDocs, query, where, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyBNUv3YO3iRBTek7XlCvTcErU8R2UIw8m0",
    authDomain: "blog-app-e0d47.firebaseapp.com",
    projectId: "blog-app-e0d47",
    storageBucket: "blog-app-e0d47.firebasestorage.app",
    messagingSenderId: "716996006682",
    appId: "1:716996006682:web:f648a63f626db9e09592a3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { createUserWithEmailAndPassword, auth, sendEmailVerification, signInWithEmailAndPassword, db, setDoc, doc, getDoc, addDoc, collection, getDocs, query, where, deleteDoc, updateDoc, sendPasswordResetEmail, provider, signInWithPopup, onAuthStateChanged, signOut };