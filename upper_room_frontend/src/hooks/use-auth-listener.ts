import { useEffect } from "react";
import { authListener } from "../firebase/firebase-auth";
import type { User } from "firebase/auth";

const useAuthListener = (
  loggedInCallback: (_user: User) => void,
  loggedOutCallback: () => void
) => {
  useEffect(() => {
    const unsubscribe = authListener((user) => {
      if (user) {
        loggedInCallback(user);
      } else {
        loggedOutCallback();
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuthListener;
