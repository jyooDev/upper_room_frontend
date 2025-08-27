import { useNavigate } from "react-router";
import { Link } from "react-scroll";
import { Link as L } from "react-router";

import { useLogger } from "../hooks";
import { useAuthContext } from "../contexts/auth-context";
import { ProfileDropdown } from ".";

const HomeNavBar = () => {
  const logger = useLogger("src/components/Navbar.tsx");
  const { isLoggedIn, isLoading } = useAuthContext();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <button className="text-2xl font-bold" onClick={() => navigate("/")}>
            UpperRoom
          </button>
          <ul className="hidden md:flex gap-6">
            <li className="cursor-pointer">
              <Link to="hero" smooth={true} duration={400}>
                Home
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="features" smooth={true} duration={400}>
                Features
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="community" smooth={true} duration={400}>
                Community
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="contact" smooth={true} duration={400}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-center gap-5">
            {isLoading ? (
              <div></div>
            ) : isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <ProfileDropdown />
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <L to="/login">
                    <button className="px-4 py-2 text-sm font-medium rounded-md text-white border-2 border-primary  bg-primary hover:border-primary-100 hover:bg-primary-100">
                      Sign In
                    </button>
                  </L>
                </div>
                <div className="flex items-center space-x-4">
                  <L to="/signup">
                    <button className="px-4 py-2 text-sm font-medium rounded-md border-primary bg-white border-2 hover:bg-gray-200">
                      Sign up
                    </button>
                  </L>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
