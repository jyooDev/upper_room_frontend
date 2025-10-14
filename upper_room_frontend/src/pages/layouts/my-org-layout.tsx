import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar, MyOrgSideBar } from "@/components";
import { useLogger } from "@/hooks";
import { OrgProvider } from "@/contexts";
import { getOrgByName, type Org } from "@/services/org-service";

const MyOrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  const logger = useLogger("/src/pages/layouts/my-org-layout.tsx");

  const { orgName: orgNameParam, orgId: orgIdParam } = useParams<{
    orgName: string;
    orgId?: string;
  }>();
  const decodedName = orgNameParam ? decodeURIComponent(orgNameParam) : "";

  logger.debug(orgIdParam);
  const [loading, setLoading] = useState(true);
  const [orgData, setOrgData] = useState<{ orgId: string; orgName: string }>({
    orgId: orgIdParam || "",
    orgName: decodedName,
  });

  useEffect(() => {
    const initializeOrg = async () => {
      logger.debug("Initializing Org....");
      if (orgIdParam) {
        setOrgData({ orgId: orgIdParam, orgName: decodedName });
      }
      if (decodedName) {
        const org: Org | null = await getOrgByName(decodedName);
        if (org) {
          setOrgData({
            orgId: org._id,
            orgName: org.name,
          });
        } else {
          logger.error("Organization not found");
        }
      }
      setLoading(false);
    };
    initializeOrg();
  }, [decodedName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  logger.debug(`Org: ${orgData.orgName} (${orgData.orgId})`);

  return (
    <>
      <Navbar isHome={false} />
      {/* Main Content */}
      <OrgProvider
        defaultOrgName={orgData.orgName}
        defaultOrgId={orgData.orgId}
      >
        <section
          id="org-home"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative flex flex-col min-h-screen overflow-hidden"
        >
          {/* Header */}
          <div className="hidden md:block relative w-full mt-18 h-30 bg-gradient-to-br from-primary-100/70 to-primary-100/90">
            <span className="flex flex-col relative w-full h-full justify-center px-5 font-semibold text-2xl text-white">
              <span>{orgData.orgName}</span>
              <span className="text-sm font-medium">
                {/* MOCK Organization Slogan */}
                Know God. Be Known. Make Him Known.
              </span>
            </span>
          </div>

          <div className="flex flex-1  flex-row w-full h-full relative">
            <MyOrgSideBar />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </section>
      </OrgProvider>
    </>
  );
};

export default MyOrganizationLayout;
