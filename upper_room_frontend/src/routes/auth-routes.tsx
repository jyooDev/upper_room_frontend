import { Route } from "react-router";
import { SetProfile, SignIn, SignUp } from "../pages";

const AuthRoutes = (
  <>
    <Route path="/login" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signup/set-profile" element={<SetProfile />} />
  </>
);

export default AuthRoutes;
