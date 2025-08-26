import { useState } from "react";
import { Route, Routes } from "react-router";
// import { Home } from "./pages/Home"
// import { SignIn } from "./pages/SignIn"
// import { SignUp } from "./pages/SignUp"
import { Home, SignIn, SignUp } from "./pages";

import { useAuthListener } from "./hooks";
import type { User } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loggedInCallback = async (_user: User) => {
    console.log("logged in user =", _user);
    const idToken = await _user.getIdToken();
    console.log("idToken =", idToken);
    setIsLoggedIn(true);
  };

  const loggedOutCallback = () => {
    console.log("user logged out");
    setIsLoggedIn(false);
  };

  useAuthListener(loggedInCallback, loggedOutCallback);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
