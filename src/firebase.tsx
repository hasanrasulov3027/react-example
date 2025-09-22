// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAuCfidgzA6OuqGsJVbtrNpZa6gPVx9Ce4",
    authDomain: "food-delivery-4a158.firebaseapp.com",
    projectId: "food-delivery-4a158",
    storageBucket: "food-delivery-4a158.firebasestorage.app",
    messagingSenderId: "879029499920",
    appId: "1:879029499920:web:35dd7c0c8c34cf5bf83295",
    measurementId: "G-26EFHPFN4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);