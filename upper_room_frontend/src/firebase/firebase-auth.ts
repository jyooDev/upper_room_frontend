import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";

import { auth } from "../main";

export const authListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const createUser = async (email: string, password: string) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error("src/firebase/firebase-auth.ts: createUser: error =", error);
    return null;
  }
};
