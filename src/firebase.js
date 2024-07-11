import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIm6goCza9B4GC9eIkbiQgol02vDoaWRQ",
  authDomain: "pennywise-app-74635.firebaseapp.com",
  projectId: "pennywise-app-74635",
  storageBucket: "pennywise-app-74635.appspot.com",
  messagingSenderId: "653429144046",
  appId: "1:653429144046:web:775db26b1fe2d3d6d576ff",
  measurementId: "G-L85VQ0X53F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };