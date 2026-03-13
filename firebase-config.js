// firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your web app's Firebase configuration
// You can find these keys in the Firebase Console: Project Settings > General > Your apps
const firebaseConfig = {
    apiKey: "AIzaSyDo895q6fM3pBkORfF8gwHUEEiLPboMqno",
    authDomain: "pbus-4c631.firebaseapp.com",
    databaseURL: "https://pbus-4c631-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pbus-4c631",
    storageBucket: "pbus-4c631.firebasestorage.app",
    messagingSenderId: "261812830094",
    appId: "1:261812830094:web:327e026fc7862525ab2edf",
    measurementId: "G-SKK6CB7DH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("Firebase initialized");

// Export the database instance to be used in other files
export { database };
