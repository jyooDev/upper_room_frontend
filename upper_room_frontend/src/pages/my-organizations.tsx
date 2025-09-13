import { Navbar } from "@/components";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { OrganizationCard } from "../components";
const MyOrganizations = () => {
  return (
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

          <Card className="p-3 w-70 h-70 flex flex-col justify-center items-center border-dashed border-2 border-gray-300 hover:border-gray-400 transition cursor-pointer">
            <button
              type="button"
              className="flex flex-col items-center justify-center text-gray-500"
            >
              <span className="text-4xl">+</span>
              <span className="mt-2 text-sm">Find More to Join!</span>
            </button>
          </Card>
        </div>
      </section>
    </>
  );
};

export default MyOrganizations;
