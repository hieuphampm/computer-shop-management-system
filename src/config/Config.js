import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA5ShyP7cnclNdjduiqd3CgM-OZfNogIeA",
    authDomain: "computer-shop-management-a2cdd.firebaseapp.com",
    projectId: "computer-shop-management-a2cdd",
    storageBucket: "computer-shop-management-a2cdd.appspot.com",
    messagingSenderId: "716820880581",
    appId: "1:716820880581:web:29cea7a9db26fd8c4264ac",
    measurementId: "G-TH4MX2H34F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
