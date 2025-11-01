import { Route } from "react-router";
import {
  Home,
  MyOrganizations,
  MyProfile,
  MyOrganizationLayout,
  MyOrganizationSermons,
  MyOrganizationPosts,
  PublicPosts,
} from "../pages";
import PublicLayout from "@/pages/layouts/public-layout";

const AppRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Home />} />
    <Route path="/my-profile" element={<MyProfile />}></Route>
    <Route path="/my-organizations" element={<MyOrganizations />}></Route>
    <Route
      path="/public"
      element={
        <PublicLayout>
          <PublicPosts />
        </PublicLayout>
      }
    ></Route>
    <Route
      path="/my-organization/sermons/:orgName/:orgId"
      element={
        <MyOrganizationLayout>
          <MyOrganizationSermons />
        </MyOrganizationLayout>
      }
    ></Route>

    <Route
      path="/my-organization/posts/:orgName/:orgId"
      element={
        <MyOrganizationLayout>
          <MyOrganizationPosts />
        </MyOrganizationLayout>
      }
    ></Route>

    <Route
      path="/my-organization/:orgName/posts/:postId"
      element={<MyOrganizationLayout>HELLO</MyOrganizationLayout>}
    ></Route>
  </>
);

export default AppRoutes;
