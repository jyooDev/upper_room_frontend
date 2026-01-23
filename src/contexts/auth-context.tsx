import { createContext, useState, useContext } from "react";

export interface IUser {
  uid: string;
  displayName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string | Date;
  gender?: string;
  username?: string;
  email?: string;
  photoURL?: string;
}

// set interface for waht context will hold
interface IAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  userRole: "MEMBER" | "ORGANIZER" | "ADMIN";
  setUserRole: (role: "MEMBER" | "ORGANIZER" | "ADMIN") => void;
  login: () => void;
  logout: () => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

// create context to use with inital values
export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  isLoading: true,
  userRole: "MEMBER",
  setUserRole: () => {},
  login: () => {},
  logout: () => {},
  user: null,
  setUser: () => {},
});

// made use context to use throughout app
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  const {
    isLoggedIn,
    userRole,
    isLoading,
    login,
    logout,
    setUserRole,
    user,
    setUser,
  } = context;
  return {
    isLoggedIn,
    isLoading,
    userRole,
    setUserRole,
    login,
    logout,
    user,
    setUser,
  };
};

// made parent to wrap app and set values for isLoggedin, login, and logout
const AuthContextProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<"MEMBER" | "ADMIN" | "ORGANIZER">(
    "MEMBER"
  );
  const [user, setUser] = useState<IUser | null>(null);
  const login = () => {
    setIsLoggedIn(true);
    setIsLoading(false);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setIsLoading(false);
    setUserRole("MEMBER");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        userRole,
        setUserRole,
        login,
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
