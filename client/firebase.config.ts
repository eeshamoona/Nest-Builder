// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey!,
  authDomain: process.env.NEXT_PUBLIC_authDomain!,
  projectId: process.env.NEXT_PUBLIC_projectId!,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket!,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId!,
  appId: process.env.NEXT_PUBLIC_appId!,
  measurementId: process.env.NEXT_PUBLIC_measurementId!,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };