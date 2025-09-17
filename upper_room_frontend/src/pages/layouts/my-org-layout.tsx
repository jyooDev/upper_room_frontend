import { useParams } from "react-router-dom";
import { Navbar, MyOrgSideBar } from "@/components";
import { useLogger } from "@/hooks";
import { OrgProvider } from "@/contexts";

const MyOrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  const logger = useLogger("/src/pages/org-home.tsx");

  const { orgName } = useParams<{ orgName: string }>();
  const name = orgName ? decodeURIComponent(orgName) : "Organization Page";
  logger.debug(name);
  return (
    <>
      <Navbar isHome={false} />
      <section
        id="org-home"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative flex flex-col min-h-screen overflow-hidden"
      >
        {/* Header */}
        <div className="hidden md:block relative w-full mt-18 h-30 bg-gradient-to-br from-primary-100/70 to-primary-100/90">
          <span className="flex flex-col relative w-full h-full justify-center px-5 font-semibold text-2xl text-white">
            <span>{name}</span>
            <span className="text-sm font-medium">
              {/* MOCK Organization Slogan */}
              Know God. Be Known. Make Him Known.
            </span>
          </span>
        </div>

        {/* Main Content */}
        <OrgProvider defaultOrgName={orgName}>
          <div className="flex flex-1  flex-row w-full h-full relative">
            <MyOrgSideBar orgName={name} />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </OrgProvider>
      </section>
    </>
  );
};

export default MyOrganizationLayout;
