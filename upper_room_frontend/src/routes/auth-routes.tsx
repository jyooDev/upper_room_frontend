import { Route } from "react-router";
import { SignIn, SignUp } from "../pages";

const AuthRoutes = (
  <>
    <Route path="/login" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </>
);

export default AuthRoutes;
