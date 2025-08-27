import { useState, type FormEvent } from "react";
import { Link as L, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import bible from "../assets/hero-page/feature-bible.jpg";
import googleLogo from "../assets/google-logo.png";

import { createUser } from "../firebase/firebase-auth";
import { useLogger } from "../hooks";

const SignUp = () => {
  // state
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<"MEMBER" | "ORGANIZER" | "ADMIN">("MEMBER");

  // hooks
  const logger = useLogger("src/pages/signup.tsx");
  const navigate = useNavigate();

  // handlers
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logger.debug("values =", {
      email,
      password,
      confirmPassword,
    });

    if (email === "" || password === "" || confirmPassword === "")
      return alert("PLEASE CHECK VALUES...");

    if (password !== confirmPassword)
      return alert("CHECK PASSWORD AND CONFIRM PASSWORD...");

    // Set user role globally
    sessionStorage.setItem("signupRole", role);
    logger.debug("SETTING USER ROLE - ", role);

    // Create firebase user
    const user = await createUser(email, password);
    logger.debug("CREATING NEW USER IN FIREBASE...");
    if (!user) return alert("Something went wrong while creating user.");
    return navigate("/");
  };

  return (
    <div className="flex items-center bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row rounded-xl bg-white shadow-xl overflow-hidden">
          {/* Left side */}
          <div
            className="hidden lg:block relative lg:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${bible})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Right side */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col px-10 gap-3">
              <h3 className="w-full flex justify-center items-center text-3xl text-gray-700 my-3 font-semibold">
                Create your account
              </h3>

              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700">Choose Role</label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="ORGANIZER"
                        checked={role === "ORGANIZER"}
                        onChange={(e) => setRole(e.target.value)}
                        className=""
                      />
                      <span className="text-gray-700">Organizer</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="MEMBER"
                        checked={role === "MEMBER"}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-radio text-blue-600"
                      />
                      <span className="text-gray-700">Member</span>
                    </label>
                  </div>
                </div>
                {role === "organizer" && (
                  <span className="text-sm text-red-700">
                    Organizer accounts require approval before they become
                    active.
                  </span>
                )}
                <div className="my-4">
                  <label className="block text-gray-700">Email address</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                    placeholder="Enter your email address"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label className="block text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-3 bottom-3 right-5 text-gray-600 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="my-4">
                  <label className="block text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                      placeholder="Enter your password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-3 bottom-3 right-5 text-gray-600 hover:text-gray-700 cursor-pointer"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="my-4">
                  <button className="flex items-center justify-center w-full py-3 bg-primary border border-gray-300 rounded text-white cursor-pointer">
                    Sign in
                  </button>
                </div>
              </form>
              <div className="flex items-center gap-4 my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="my-4">
                <button className="w-full flex items-center justify-center gap-2 px-2 py-2 border border-gray-300 rounded">
                  <img src={googleLogo} alt="google-login" className="w-8" />
                  <span>Sign up with Google</span>
                </button>
              </div>
              <div className="my-4">
                <div className="flex w-full items-center justify-center gap-2">
                  <span className="text-gray-700 text-xs">Have account</span>
                  <L to="/login">
                    <span className="text-blue-500 hover:underline text-xs">
                      Login
                    </span>
                  </L>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
