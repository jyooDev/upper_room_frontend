import { useAppDispatch } from ".";
import type { User } from "firebase/auth";

import { setUser, clearUser } from "../store/userSlice";

const useAuthHandlers = () => {
  const dispatch = useAppDispatch();

  const loggedInCallback = async (_user: User) => {
    console.log("logged in user =", _user);
    const idToken = await _user.getIdToken();
    console.log("idToken =", idToken);
    dispatch(
      setUser({
        uid: _user.uid,
        email: _user.email,
        displayName: _user.displayName,
      })
    );
  };

  const loggedOutCallback = () => {
    console.log("user logged out");
    dispatch(clearUser());
  };

  return { loggedInCallback, loggedOutCallback };
};

export default useAuthHandlers;
