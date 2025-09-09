import { Route } from "react-router";
import { Home, MyProfile } from "../pages";

const AppRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Home />} />
    <Route path="/my-profile" element={<MyProfile />}></Route>
  </>
);

export default AppRoutes;
