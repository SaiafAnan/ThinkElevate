// FirebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration details
const firebaseConfig = {
    apiKey: "AIzaSyDl21Sq7yv7yWhWJiqZKcpKsItKCsL_TeY",
    authDomain: "risensolve.firebaseapp.com",
    projectId: "risensolve",
    storageBucket: "risensolve.appspot.com",
    messagingSenderId: "1002304661568",
    appId: "1:1002304661568:web:739a61b370babe380117a5"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };
