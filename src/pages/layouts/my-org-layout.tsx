import { useParams } from "react-router-dom";
import { Navbar, MyOrgSideBar } from "@/components";
import { OrgProvider } from "@/contexts";

interface OrgData {
  orgId: string;
  orgName: string;
}

const MyOrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  const { orgName: orgNameParam, orgId: orgIdParam } = useParams<{
    orgName: string;
    orgId: string;
  }>();
  const orgData: OrgData = {
    orgId: orgIdParam ? decodeURIComponent(orgIdParam) : "",
    orgName: orgNameParam ? decodeURIComponent(orgNameParam) : "",
  };

  return (
    <>
      <Navbar isHome={false} />

      <OrgProvider
        defaultOrgName={orgData.orgName}
        defaultOrgId={orgData.orgId}
      >
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen overflow-hidden relative">
          {/* Header */}
          <div className="hidden md:block w-full mt-18 h-30 bg-gradient-to-br from-primary-100/70 to-primary-100/90">
            <div className="flex flex-col justify-center px-5 h-full text-white font-semibold text-2xl">
              <span>{orgData.orgName}</span>
              <span className="text-sm font-medium">
                Know God. Be Known. Make Him Known.
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 flex-row w-full h-full relative">
            <MyOrgSideBar />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </section>
      </OrgProvider>
    </>
  );
};

export default MyOrganizationLayout;
