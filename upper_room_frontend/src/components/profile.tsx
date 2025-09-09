import { useMemo, useState, useRef, useEffect } from "react";
import { Link as L } from "react-router";
import randomColor from "randomcolor";
import tinycolor from "tinycolor2";
import { AnimatePresence, motion } from "framer-motion";

import { useLogout } from "../hooks";
import { useAuthContext } from "../contexts/auth-context";
const ProfileDropdown = () => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const color = useMemo(
    () => randomColor({ luminosity: "light", hue: "orange" }),
    []
  );
  const avatarTextColor = tinycolor(color).darken(55).toHexString();
  const { user } = useAuthContext();
  if (!user) return;
  const userInfo = user.displayName || "U";
  const userPhotoURL = user.photoURL || false;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const logout = useLogout();
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div className="flex justify-center items-center w-18 h-18">
        {userPhotoURL ? (
          <div
            className="overflow-hidden w-11 h-11 rounded-full"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img className="object-cover w-full h-full" src={userPhotoURL} />
          </div>
        ) : (
          <div
            style={{ backgroundColor: color, color: avatarTextColor }}
            className="flex justify-center items-center w-11 h-11 rounded-full text-center font-semibold text-2xl shadow cursor-pointer p-3 box-border"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {userInfo[0]}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-50 bg-white/90 rounded-md shadow-md min-w-[200px]"
          >
            <div className="px-4 py-1 flex flex-col font-medium text-gray-700">
              <L to="/my-profile">
                <div className="hover:bg-gray-300 px-2 py-1 rounded cursor-pointer">
                  Profile
                </div>
              </L>
              <div className="hover:bg-gray-300 px-2 py-1 rounded cursor-pointer">
                My Organizations
              </div>
              <span className="border-b border-gray-300"></span>
              <div
                onClick={logout}
                className="hover:bg-gray-300 px-2 py-1 rounded cursor-pointer"
              >
                Sign out
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
