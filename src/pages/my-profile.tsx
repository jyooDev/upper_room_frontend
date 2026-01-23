import { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { updateProfile, getAuth } from "firebase/auth";

import { Navbar } from "../components";
import { useAuthContext } from "../contexts/auth-context";
import { useLogger } from "../hooks";
import avatar from "../assets/default-profile-avatar.webp";
import { updateUserProfile } from "@/services/user-service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { CiCalendar } from "react-icons/ci";

// Types
type ProfileFormValues = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob?: string | Date;
  gender?: string;
  username?: string;
  email: string;
};

const MyProfile = () => {
  const [curtab, setCurTab] = useState<"profile" | "activity">("profile");
  const { user, isLoading, setUser } = useAuthContext();
  const logger = useLogger("/src/pages/my-profile.tsx");

  logger.debug(user);
  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      username: "",
      email: "",
    },
  });

  const gender = watch("gender");
  const dob = watch("dob");
  // Populate form with user data when loaded
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("middleName", user.middleName || "");
      setValue("lastName", user.lastName || "");
      if (user.dob) {
        const date = new Date(user.dob);
        const formatted = date.toISOString().split("T")[0]; // YYYY-MM-DD
        setValue("dob", formatted);
      } else {
        logger.debug("USER DID NOT HAVE DOB");
        setValue("dob", "");
      }

      setValue("gender", user.gender || "");
      setValue("username", user.username || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  // Form submit handler
  const onSubmitHandler = async (data: ProfileFormValues) => {
    logger.debug(typeof user?.dob);
    if (!user) return;

    const fullname = [data.firstName, data.middleName, data.lastName]
      .filter(Boolean)
      .join(" ");

    // Update Firebase Auth profile
    const firebaseUser = getAuth().currentUser;
    if (firebaseUser) {
      await updateProfile(firebaseUser, { displayName: fullname });
    }

    // Prepare payload for DB update
    const payload = {
      name: {
        firstName: data.firstName,
        middleName: data.middleName || undefined,
        lastName: data.lastName,
      },
      dob: data.dob || undefined || Date || String,
      gender: data.gender || undefined,
      username: data.username,
    };

    if (!user.uid) return;
    await updateUserProfile(user.uid, payload);

    logger.debug("data =", data);

    // Update Auth Context
    setUser({
      uid: user.uid,
      displayName: firebaseUser?.displayName || "",
      email: user.email,
      dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      gender: data.gender,
      username: data.username,
      photoURL: user.photoURL,
    });

    alert("Successfully updated.");
    window.location.reload();
  };

  // Render
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
            My Account
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-20 mb-10 flex justify-start relative max-w-7xl gap-4 text-sm md:mt-5 ml-10">
          <button
            onClick={() => setCurTab("profile")}
            className="hover:text-gray-800 relative flex flex-col text-gray-700 font-medium"
          >
            <span>MY PROFILE</span>
            {curtab === "profile" && (
              <span className="h-1 bg-primary-100/50 w-full"></span>
            )}
          </button>
          <button
            onClick={() => setCurTab("activity")}
            className="hover:text-gray-800 relative flex flex-col text-gray-700 font-medium"
          >
            <span>MY ACTIVITY</span>
            {curtab === "activity" && (
              <span className="h-1 bg-primary-100/50 w-full"></span>
            )}
          </button>
        </div>

        {/* Main Content */}
        {!isLoading && (
          <div className="text-gray-800">
            {curtab === "profile" && (
              <div className="flex flex-col md:flex-row md:gap-20 px-25">
                {/* Profile Avatar & Actions */}
                <div className="grid-left flex flex-col">
                  <div className="overflow-hidden rounded-full w-32 h-32 mb-5">
                    <img
                      className="object-cover w-full h-full"
                      src={user?.photoURL ? user.photoURL : avatar}
                      alt="Profile"
                    />
                  </div>
                  <div className="flex w-32 justify-center gap-3">
                    <button>
                      <MdModeEdit />
                    </button>
                    <button>
                      <MdDelete />
                    </button>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid-right flex flex-col">
                  <div className="flex justify-center gap-50 items-center w-full">
                    <h1 className="font-semibold text-gray-800">
                      Personal Information
                    </h1>
                    <button
                      type="submit"
                      form="profile-update-form"
                      className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white"
                    >
                      SAVE
                    </button>
                  </div>
                  <div>
                    <form
                      id="profile-update-form"
                      onSubmit={handleSubmit(onSubmitHandler)}
                      className="flex flex-col gap-2"
                    >
                      {/* Email */}
                      <label className="text-xs">
                        Email
                        <input
                          {...register("email")}
                          className="w-full px-4 py-2 border border-gray-200 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                          type="text"
                          readOnly
                        />
                        {errors["email"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["email"].message}
                          </p>
                        )}
                      </label>
                      {/* First Name */}
                      <label className="text-xs">
                        First name
                        <input
                          {...register("firstName", {
                            required: "firstname is required",
                          })}
                          className="w-full px-4 py-2 border border-gray-200 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                          type="text"
                        />
                        {errors["firstName"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["firstName"].message}
                          </p>
                        )}
                      </label>
                      {/* Middle Name */}
                      <label className="text-xs">
                        Middle name
                        <input
                          {...register("middleName")}
                          className="w-full px-4 py-2 border border-gray-200 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                          type="text"
                        />
                        {errors["middleName"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["middleName"].message}
                          </p>
                        )}
                      </label>
                      {/* Last Name */}
                      <label className="text-xs">
                        Last name
                        <input
                          {...register("lastName", {
                            required: "lastname is required",
                          })}
                          className="w-full px-4 py-2 border border-gray-200 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                          type="text"
                        />
                        {errors["lastName"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["lastName"].message}
                          </p>
                        )}
                      </label>
                      {/* Username */}
                      <label className="text-xs">
                        Username
                        <input
                          {...register("username", {
                            required: "username is required",
                          })}
                          className="w-full px-4 py-2 border border-gray-200 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                          type="text"
                        />
                        {errors["username"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["username"].message}
                          </p>
                        )}
                      </label>
                      {/* Gender */}
                      <label htmlFor="gender" className="text-xs">
                        Gender
                        <input
                          id="gender"
                          {...register("gender")}
                          className="sr-only"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="block flex-1 rounded-md border border-gray-200 px-3 py-2 text-left text-sm text-gray-600 font-normal focus:ring-white"
                            >
                              {gender || "Select gender"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="w-full rounded-md border border-gray-200 bg-white shadow-md"
                            align="start"
                          >
                            <DropdownMenuRadioGroup
                              value={gender}
                              onValueChange={(v) => setValue("gender", v)}
                            >
                              <DropdownMenuRadioItem value="M">
                                Male
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="F">
                                Female
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </label>

                      {/* Date of Birth */}
                      <label htmlFor="dob" className="text-xs flex flex-col">
                        <span>Date of Birth</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="dob"
                              className="w-48 justify-start font-normal"
                            >
                              <CiCalendar />
                              {dob
                                ? new Date(dob).toISOString().split("T")[0]
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setValue("dob", date);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </label>
                    </form>
                  </div>
                </div>
              </div>
            )}
            {curtab === "activity" && <div>ACTIVITYTAB</div>}
          </div>
        )}
      </section>
    </>
  );
};

export default MyProfile;
