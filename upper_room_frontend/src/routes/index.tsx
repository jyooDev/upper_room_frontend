import { Route, Routes } from "react-router";
import { Home } from "../pages";

import AuthRoutes from "./auth-routes";
import { useAuthHandlers, useAuthListener } from "../hooks";

const AppRouter = () => {
  const { loggedInCallback, loggedOutCallback } = useAuthHandlers();
  useAuthListener(loggedInCallback, loggedOutCallback);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {AuthRoutes}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
