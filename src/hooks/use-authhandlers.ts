import type { User } from "firebase/auth";

import { useAuthContext } from "../contexts/auth-context";

import {
  userExists,
  createUser,
  getUser,
  updateLastLogin,
} from "../services/user-service";
import { useLogger } from ".";

const logger = useLogger("/src/hooks/use-authhandlers.ts");

const useAuthHandlers = () => {
  const { login, logout, setUserRole, setUser } = useAuthContext();
  const loggedInCallback = async (_user: User) => {
    try {
      logger.debug("logged in user =", _user);
      const exists = await userExists(_user.email as string);
      logger.debug("exists =", exists);
      if (exists) {
        logger.debug("UPDATE USERS LAST SEEN AT");
        const user = await getUser(_user.uid);
        setUser({
          uid: user._id,
          email: user.email,
          displayName: _user.displayName || "",
          firstName: user.name.firstName,
          middleName: user.name.middleName,
          lastName: user.name.lastName,
          gender: user.gender,
          username: user.username,
          photoURL: _user.photoURL || "",
          dob: user.dob || "",
        });
        setUserRole(user.role);
        const updatedLastLogin = await updateLastLogin(_user.uid);
        console.log(updatedLastLogin);
      } else {
        const role =
          (sessionStorage.getItem("signupRole") as
            | "MEMBER"
            | "ORGANIZER"
            | "ADMIN") || "MEMBER";
        setUserRole(role);
        logger.debug("CREATING NEW USER");
        const newUser = await createUser({
          _id: _user.uid,
          email: _user.email,
          role: role,
        });
        logger.debug("newUser =", newUser);
        setUser({
          uid: _user.uid,
          email: _user.email || "",
          displayName: _user.displayName || "",
        });
      }
      login();
    } catch (error) {
      console.error("error =", error);
    }
  };

  const loggedOutCallback = () => {
    console.log("user logged out");
    logout();
    setUser(null);
  };

  return { loggedInCallback, loggedOutCallback };
};

export default useAuthHandlers;
