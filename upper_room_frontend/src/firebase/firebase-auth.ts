import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";

import { auth } from "../main";

import Logger from "../utils/logger";

const logger = new Logger("src/firebase/firebase-auth.ts");

export const authListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const createUser = async (email: string, password: string) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    logger.debug("createUser error = ", error);
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    logger.debug("user login: ", user);
    return user;
  } catch (error) {
    logger.debug("login error = ", error);
  }
};

export const signout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    logger.debug("logout error = ", error);
  }
};
