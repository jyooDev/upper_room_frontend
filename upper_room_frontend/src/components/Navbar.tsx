import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-scroll";

export const HomeNavBar = () => {
  const navigate = useNavigate();
    return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <button className="text-2xl font-bold" onClick={() => navigate('/')}>UpperRoom</button>
            <ul className="hidden md:flex gap-6">
              <li className="cursor-pointer">
              <Link
              to='hero' smooth={true} duration={400}>
                Home
              </Link></li>
              <li className="cursor-pointer">
              <Link
              to='features' smooth={true} duration={400}>
                Features
              </Link></li>
              <li className="cursor-pointer">
              <Link
              to='community' smooth={true} duration={400}>
                Community
              </Link>
              </li>
              <li className="cursor-pointer">
              <Link
              to='contact' smooth={true} duration={400}>
                Contact                
              </Link>
              </li>
            </ul>
            <div className="flex items-center justify-center gap-5">
              <div className="flex items-center space-x-4"><button className="px-4 py-2 text-sm font-medium rounded-md text-white border-2 border-primary  bg-primary hover:border-primary hover:bg-primary">Sign In</button></div>
              <div className="flex items-center space-x-4"><button className="px-4 py-2 text-sm font-medium rounded-md border-primary bg-white border-2 hover:bg-gray-200">Sign up</button></div>
            </div>
          </div>
        </div>
     </nav>
     );
}