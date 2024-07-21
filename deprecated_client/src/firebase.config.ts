// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey!,
  authDomain: process.env.REACT_APP_authDomain!,
  projectId: process.env.REACT_APP_projectId!,
  storageBucket: process.env.REACT_APP_storageBucket!,
  messagingSenderId: process.env.REACT_APP_messagingSenderId!,
  appId: process.env.REACT_APP_appId!,
  measurementId: process.env.REACT_APP_measurementId!,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
