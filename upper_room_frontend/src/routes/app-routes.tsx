import { Route } from "react-router";
import {
  Home,
  MyOrganizations,
  MyProfile,
  MyOrganizationLayout,
  MyOrganizationSermons,
} from "../pages";

const AppRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Home />} />
    <Route path="/my-profile" element={<MyProfile />}></Route>
    <Route path="/my-organizations" element={<MyOrganizations />}></Route>
    <Route
      path="/my-organization/:orgName/sermons"
      element={
        <MyOrganizationLayout>
          <MyOrganizationSermons />
        </MyOrganizationLayout>
      }
    ></Route>
  </>
);

export default AppRoutes;
