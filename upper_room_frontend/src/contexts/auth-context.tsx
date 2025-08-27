import { createContext, useState, useContext } from "react";

// set interface for waht context will hold
interface IAuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// create context to use with inital values
export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// made use context to use throughout app
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  const { isLoggedIn, login, logout } = context;
  return {
    isLoggedIn,
    login,
    logout,
  };
};

// made parent to wrap app and set values for isLoggedin, login, and logout
const AuthContextProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
