import { useEffect, useState } from "react";

import { Navbar } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

import { OrganizationCard, Loader } from "../components";
import { getOrgByMemberId, type Org } from "@/services/org-service";
import { useAuthContext } from "../contexts/auth-context";
import Logger from "../utils/logger";

const logger = new Logger("/src/pages/my-organizations.tsx");

const MyOrganizations = () => {
  const [isFindDialogOpen, setIsFindDialogOpen] = useState(false);
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(true);
  const [isJoinResultDialogOpen, setIsJoinResultDialogOpen] = useState(false);
  const [joinResultMessage, setJoinResultMessage] = useState<string>("");
  const [organizations, setOrganizations] = useState<Org[]>([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchOrgs = async () => {
      if (!user?.uid) return;

      try {
        setIsLoadingDialogOpen(true);
        const orgs = await getOrgByMemberId(user.uid);
        logger.debug("Fetched orgs: ", orgs);
        if (!orgs) return;
        setOrganizations(orgs);
      } catch (error) {
        logger.error("Error fetching organizations:", error);
      } finally {
        setIsLoadingDialogOpen(false);
      }
    };

    fetchOrgs();
  }, [user?.uid]);
  const handleJoinOrganization = async (orgName: string) => {
    try {
      setIsFindDialogOpen(false);
      setIsLoadingDialogOpen(true);

      // On success
      setJoinResultMessage(`Successfully sent join request to "${orgName}".`);
    } catch (error) {
      // On error
      setJoinResultMessage(`Failed to send join request: ERROR MESSAGE`);
    } finally {
      // Close loader
      setIsLoadingDialogOpen(false);
      setIsJoinResultDialogOpen(true);
    }
  };

  return (
    <>
      <Loader
        isLoadingDialogOpen={isLoadingDialogOpen}
        loaderMessage="Loading..."
      />

      {!isLoadingDialogOpen && (
        <>
          <Navbar isHome={false} />
          <section
            id="my-profile"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative flex flex-col min-h-screen overflow-hidden"
          >
            {/* Header */}
            <div className="hidden md:block relative w-full mt-18 h-30 bg-gradient-to-br from-primary-100/70 to-primary-100/90">
              <span className="flex relative w-full h-full items-center px-5 font-semibold text-2xl text-white">
                My Organizations
              </span>
            </div>

            {/* Main Content */}

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative max-w-7xl gap-4 text-sm mx-auto">
              {organizations.map((org) => (
                <OrganizationCard
                  key={org._id}
                  orgName={org.name}
                  orgId={org._id}
                  logoImage={org.logoURL || ""}
                />
              ))}

              {/* -------- Dialog 1: Find Org Dialog -------- */}
              <Dialog
                open={isFindDialogOpen}
                onOpenChange={setIsFindDialogOpen}
              >
                <form>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      className="w-70 h-70 flex flex-col border-dashed border-2 border-gray-300 bg-white hover:bg-white hover:border-gray-400 transition cursor-pointerflex-col items-center justify-center text-gray-500"
                    >
                      <span className="text-4xl">+</span>
                      <span className="mt-2 text-sm">Find More to Join!</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-4">
                    <DialogHeader className="w-full">
                      <DialogTitle>Find Your Organization</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    {/* Serach Bar */}
                    <div className="relative w-2/3 max-w-2/3">
                      <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Enter your organization"
                        className="pl-10"
                      ></Input>
                    </div>

                    {/* -----UI MOCK START----- */}
                    <div className="relative w-full grid grid-cols-2 sm:grid-cols-3 max-w-7xl gap-4 text-sm mx-auto">
                      <OrganizationCard
                        orgName="Young Adult Ministry"
                        orgId="disafjOrgId1@sds"
                        logoImage="https://southerncharmdesign.co/wp-content/uploads/2018/05/YoungAdultMinisty_Logo_2.jpg"
                        join={true}
                        onJoinClick={handleJoinOrganization}
                      />
                    </div>
                    {/* -----UI MOCK END----- */}
                    <div className="my-2"></div>
                    <DialogFooter className="relative flex w-full justify-center sm:justify-center items-center">
                      <div className="flex items-center gap-1 text-xs ">
                        <span className="text-gray-800">
                          Can’t find your organization?
                        </span>
                        <a className="text-blue-500 cursor-pointer">
                          Create your organization!
                        </a>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>

              {/* -------- Dialog 2: Join Success Message -------- */}
              <Dialog
                open={isJoinResultDialogOpen}
                onOpenChange={setIsJoinResultDialogOpen}
              >
                <DialogContent className="sm:max-w-md text-center">
                  <DialogHeader>
                    <DialogTitle>Request Sent ✅</DialogTitle>
                    <DialogDescription>{joinResultMessage}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      className="w-full mt-4"
                      onClick={() => setIsJoinResultDialogOpen(false)}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MyOrganizations;
