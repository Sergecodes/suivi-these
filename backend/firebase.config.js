require('dotenv').config();

// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
// const { getAnalytics } = require('firebase/analytics');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_STORAGE_API_KEY,
  authDomain: "suivi-these.firebaseapp.com",
  projectId: "suivi-these",
  storageBucket: "suivi-these.appspot.com",
  messagingSenderId: "126041217948",
  appId: "1:126041217948:web:aa7f5d4d2e8b8bff4bc659",
  measurementId: "G-MWT4E9WS86"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

module.exports = { storage };
