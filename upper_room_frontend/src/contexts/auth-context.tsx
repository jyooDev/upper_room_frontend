import { createContext, useState, useContext } from "react";

// set interface for waht context will hold
interface IAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  userRole: "MEMBER" | "ORGANIZER" | "ADMIN";
  setUserRole: (role: "MEMBER" | "ORGANIZER" | "ADMIN") => void;
  login: () => void;
  logout: () => void;
}

// create context to use with inital values
export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  isLoading: true,
  userRole: "MEMBER",
  setUserRole: () => {},
  login: () => {},
  logout: () => {},
});

// made use context to use throughout app
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  const { isLoggedIn, userRole, isLoading, login, logout, setUserRole } =
    context;
  return {
    isLoggedIn,
    isLoading,
    userRole,
    setUserRole,
    login,
    logout,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
