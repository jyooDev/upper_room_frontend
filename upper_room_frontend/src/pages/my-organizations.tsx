import { useState } from "react";

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

const MyOrganizations = () => {
  const [isFindDialogOpen, setIsFindDialogOpen] = useState(false);
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
  const [isJoinResultDialogOpen, setIsJoinResultDialogOpen] = useState(false);
  const [joinResultMessage, setJoinResultMessage] = useState<string>("");

  const handleJoinOrganization = async (orgName: string) => {
    try {
      setIsFindDialogOpen(false);
      setIsLoadingDialogOpen(true);

      // ----FIX----
      // Simulate API call (replace with real one)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // fake 2s delay

      // On success
      setJoinResultMessage(`Successfully sent join request to "${orgName}".`);
    } catch (error) {
      // On error
      setJoinResultMessage(`Failed to send join request: ${error.message}`);
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
        loaderMessage="Sending Join Request..."
      />

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

        {/* -----UI MOCK START----- */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative max-w-7xl gap-4 text-sm mx-auto">
          <OrganizationCard
            orgName="대천소망감리교회"
            logoImage="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMjFfMjQ0%2FMDAxNjQ3ODQxNzYxNTcy.NwhMIsFFHs-a7NjxSTZAQvX9C59aHv5VuxZ1Nb4UAYcg.ih32G-R66cZRXcv7y3JjWGf6Vb_eNDCYN4gJU-p0pUsg.JPEG.network5891%2F%25B4%25EB%25C3%25B5%25BC%25D2%25B8%25C1%25B0%25A8%25B8%25AE.jpg&type=sc960_832"
          />

          <OrganizationCard
            orgName="녹동감리교회"
            logoImage="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20110126_1%2Fboramadok_1296005146489TKMjh_jpg%2F%25B0%25A8%25B8%25AE%25B1%25B3%25B8%25B6%25C5%25A9_boramadok.jpg&type=sc960_832"
          />

          <OrganizationCard
            orgName="Young Adult Ministry"
            logoImage="https://southerncharmdesign.co/wp-content/uploads/2018/05/YoungAdultMinisty_Logo_2.jpg"
          />
          {/* -----UI MOCK END----- */}

          {/* -------- Dialog 1: Find Org Dialog -------- */}
          <Dialog open={isFindDialogOpen} onOpenChange={setIsFindDialogOpen}>
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
  );
};

export default MyOrganizations;
