import { Routes } from "react-router";

import AuthRoutes from "./auth-routes";
import AppRoutes from "./app-routes";
import { useAuthHandlers, useAuthListener } from "../hooks";

const AppRouter = () => {
  const { loggedInCallback, loggedOutCallback } = useAuthHandlers();
  useAuthListener(loggedInCallback, loggedOutCallback);

  return (
    <Routes>
      {AppRoutes}
      {AuthRoutes}
    </Routes>
  );
};

export default AppRouter;
