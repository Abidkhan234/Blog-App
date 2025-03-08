import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js'
import { getFirestore, setDoc, doc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js'


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


export { createUserWithEmailAndPassword, auth, sendEmailVerification, signInWithEmailAndPassword, db, setDoc, doc };