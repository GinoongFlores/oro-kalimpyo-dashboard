// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD8i4nwHYWBTj5-APkLJn7ZmTuSSNygOY0",
	authDomain: "orokalimpyo-ok.firebaseapp.com",
	databaseURL: "https://orokalimpyo-ok-default-rtdb.firebaseio.com",
	projectId: "orokalimpyo-ok",
	storageBucket: "orokalimpyo-ok.appspot.com",
	messagingSenderId: "267363004626",
	appId: "1:267363004626:web:f1f0d6209044a20d87fd0b",
	measurementId: "G-ZD3ML2CFH8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const secondaryApp = initializeApp(firebaseConfig, "secondary");
export const secondAuth = getAuth(secondaryApp)

// const analytics = getAnalytics(app);

