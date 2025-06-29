// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtyavntHRhwIWHRu8BjsIKd8cxPm1RmxY",
  authDomain: "cruxsoundworks.firebaseapp.com",
  projectId: "cruxsoundworks",
  storageBucket: "cruxsoundworks.firebasestorage.app",
  messagingSenderId: "962517131548",
  appId: "1:962517131548:web:04ef701918d16014d35ad9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
