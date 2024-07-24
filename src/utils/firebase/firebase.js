import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, 
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmKVqLObCjoKOqsEZhBJUuBBbp-GgLJoQ",
  authDomain: "fullstack-next-app-8b756.firebaseapp.com",
  projectId: "fullstack-next-app-8b756",
  storageBucket: "fullstack-next-app-8b756.appspot.com",
  messagingSenderId: "413349980611",
  appId: "1:413349980611:web:3ec756c4ee110bea15f576",
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => {
  signInWithPopup(auth, googleProvider);
};
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.id);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user doc", error.message);
    }
  }
  console.log(userDocRef); 
};

export const createUserAuthWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
 
export const storage = getStorage(app);