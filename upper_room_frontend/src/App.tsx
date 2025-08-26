import React from "react";
import { Route, Routes } from "react-router";
import { Home, SignIn, SignUp } from "./pages";

import { useAuthListener, useAuthHandlers } from "./hooks";

function App() {
  const { loggedInCallback, loggedOutCallback } = useAuthHandlers();
  useAuthListener(loggedInCallback, loggedOutCallback);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
