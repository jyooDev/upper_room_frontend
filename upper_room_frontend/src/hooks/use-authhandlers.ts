import { useAppDispatch } from ".";
import type { User } from "firebase/auth";

import { setUser, clearUser } from "../store/userSlice";
import { useAuthContext } from "../contexts/auth-context";

import { getUser, userExists, createUser } from "../services/user-service";

const useAuthHandlers = () => {
  const dispatch = useAppDispatch();
  const { login, logout } = useAuthContext();

  const loggedInCallback = async (_user: User) => {
    try {
      console.log("logged in user =", _user);
      const exists = await userExists(_user.email as string);
      console.log("exists =", exists);
      if (exists) {
        console.log("UPDATE USERS LAST SEEN AT");
        // update user for last signin or lastseenat
      } else {
        // need to create user
        const newUser = await createUser({
          email: _user.email,
          role: "MEMBER",
        });
        console.log("newUser =", newUser);
      }

      const idToken = await _user.getIdToken();
      console.log("idToken =", idToken);
      login();
      dispatch(
        setUser({
          uid: _user.uid,
          email: _user.email,
          displayName: _user.displayName,
        })
      );
    } catch (error) {
      console.error("error =", error);
    }
  };

  const loggedOutCallback = () => {
    console.log("user logged out");
    logout();
    dispatch(clearUser());
  };

  return { loggedInCallback, loggedOutCallback };
};

export default useAuthHandlers;
