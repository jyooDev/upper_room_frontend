import { createContext, useState, useContext } from "react";

// set interface for waht context will hold
interface IAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

// create context to use with inital values
export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

// made use context to use throughout app
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  const { isLoggedIn, login, logout, isLoading } = context;
  return {
    isLoggedIn,
    isLoading,
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
  const login = () => {
    setIsLoggedIn(true);
    setIsLoading(false);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
