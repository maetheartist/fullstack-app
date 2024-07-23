
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmKVqLObCjoKOqsEZhBJUuBBbp-GgLJoQ",
  authDomain: "fullstack-next-app-8b756.firebaseapp.com",
  projectId: "fullstack-next-app-8b756",
  storageBucket: "fullstack-next-app-8b756.appspot.com",
  messagingSenderId: "413349980611",
  appId: "1:413349980611:web:3ec756c4ee110bea15f576"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth();