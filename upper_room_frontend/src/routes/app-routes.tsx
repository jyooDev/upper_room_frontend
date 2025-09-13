import { Route } from "react-router";
import { Home, MyOrganizations, MyProfile } from "../pages";

const AppRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Home />} />
    <Route path="/my-profile" element={<MyProfile />}></Route>
    <Route path="/my-organizations" element={<MyOrganizations />}></Route>
  </>
);

export default AppRoutes;
