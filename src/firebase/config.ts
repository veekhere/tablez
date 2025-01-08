import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaIYLQ3Ul4LgmmLLzTcZDYPl8VBnZ8IR8",
  authDomain: "tablez-veekhere.firebaseapp.com",
  projectId: "tablez-veekhere",
  storageBucket: "tablez-veekhere.appspot.com",
  messagingSenderId: "662963220676",
  appId: "1:662963220676:web:f44a6fbf0c7c462f319991"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
