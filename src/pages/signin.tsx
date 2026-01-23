import { useState } from "react";

// Third-party
import { Link as L } from "react-router";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Assets
import bible from "../assets/hero-page/feature-bible.jpg";
import googleLogo from "../assets/google-logo.png";

// Project imports
import { useLogger } from "@/hooks";
import { login as Login } from "../firebase/firebase-auth";

// Types
type SigninFormValues = {
  email: string;
  password: string;
};

// Components
const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // form settings
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // hooks
  const navigate = useNavigate();
  const logger = useLogger("/src/pages/signin.tsx");

  // handlers
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmitHandler = async (data: SigninFormValues) => {
    logger.debug("Form data:", data);
    const userCredentials = await Login(data.email, data.password);
    if (userCredentials) {
      return navigate("/");
    }
    console.log(userCredentials);
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
                Sign in to your account
              </h3>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="my-4">
                  <label className="block text-gray-700">
                    Username or email address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email address.",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                    placeholder="Enter your email address"
                    type="text"
                  />
                  {errors["email"] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors["email"].message}
                    </p>
                  )}
                </div>
                <div className="my-4">
                  <label className="block text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                    />
                    {errors["password"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["password"].message}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="absolute top-3 bottom-3 right-5 text-gray-600 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="my-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="" id="" />
                    <span className="text-gray-700 font-semibold text-sm ">
                      Remember Me
                    </span>
                  </div>
                  <a className="text-blue-600 hover:underline text-sm" href="#">
                    Forget Password
                  </a>
                </div>
                <div className="my-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full py-3 bg-primary border border-gray-300 rounded text-white cursor-pointer"
                  >
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
                  <span>Google</span>
                </button>
              </div>
              <div className="my-4">
                <div className="flex w-full items-center justify-center gap-2">
                  <span className="text-gray-700 text-xs">
                    Don't have account
                  </span>
                  <L to="/signup">
                    <span className="text-blue-500 hover:underline text-xs">
                      Create an account
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

export default SignIn;
