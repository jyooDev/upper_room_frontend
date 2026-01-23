import { Navbar } from "@/components";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar isHome={false} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen overflow-hidden relative">
        {/* Header */}
        <div className="hidden md:block w-full mt-18 h-30 bg-gradient-to-br from-primary-100/70 to-primary-100/90">
          <div className="flex flex-col justify-center px-5 h-full text-white font-semibold text-2xl">
            <span>Open Community</span>
            <span className="text-sm font-medium">
              Share your daily testimony!
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-row w-full h-full relative">
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </section>
    </>
  );
};

export default PublicLayout;
