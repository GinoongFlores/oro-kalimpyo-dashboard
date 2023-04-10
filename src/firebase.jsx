// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
	authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
	databaseURL: "https://orokalimpyo-default-rtdb.firebaseio.com",
	projectId: "orokalimpyo",
	storageBucket: "orokalimpyo.appspot.com",
	messagingSenderId: "772158884703",
	appId: "1:772158884703:web:1aa813ecd681fbad9c04ea",
	measurementId: "G-MHMT4GFRF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

// const analytics = getAnalytics(app);
