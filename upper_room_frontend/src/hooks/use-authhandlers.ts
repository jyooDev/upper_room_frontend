import { useAppDispatch } from ".";
import type { User } from "firebase/auth";

import { setUser, clearUser } from "../store/user-slice";
import { useAuthContext } from "../contexts/auth-context";

import { userExists, createUser } from "../services/user-service";
import { useLogger } from ".";

const logger = useLogger("/src/hooks/use-authhandlers.ts");

const useAuthHandlers = () => {
  const dispatch = useAppDispatch();
  const { login, logout, setUserRole, userRole } = useAuthContext();
  const loggedInCallback = async (_user: User) => {
    try {
      logger.debug("logged in user =", _user);
      const exists = await userExists(_user.email as string);
      logger.debug("exists =", exists);
      const role =
        (sessionStorage.getItem("signupRole") as
          | "MEMBER"
          | "ORGANIZER"
          | "ADMIN") || "MEMBER";

      setUserRole(role);
      if (exists) {
        logger.debug("UPDATE USERS LAST SEEN AT");
        // update user for last signin or lastseenat
      } else {
        logger.debug("CREATING NEW USER");
        const newUser = await createUser({
          _id: _user.uid,
          email: _user.email,
          role: role,
        });
        logger.debug("newUser =", newUser);
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
