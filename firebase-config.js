import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.VUE_APP_GOOGLE_KEY,
  authDomain: "react-native-2a7c2.firebaseapp.com",
  projectId: "react-native-2a7c2",
  storageBucket: "react-native-2a7c2.appspot.com",
  messagingSenderId: "966316931260",
  appId: "1:966316931260:web:37bebb0a4ff31ba719f8b9"
};

const app = initializeApp(firebaseConfig);

export const store = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export const auth = getAuth(app);