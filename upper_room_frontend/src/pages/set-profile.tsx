// React
import { useState } from "react";
import { useForm } from "react-hook-form";

// Third-party
import { motion } from "framer-motion";

// Firebase
import { getAuth, updateProfile } from "firebase/auth";

// UI Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Hooks
import { useAppDispatch, useLogger } from "@/hooks";

// Redux / store
import { setUser } from "@/store/user-slice";

// Services
import { updateUserProfile } from "@/services/user-service";
import { useNavigate } from "react-router";

// Types
type ProfileFormValues = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob?: string;
  gender?: string;
  username: string;
};

const SetProfile = () => {
  // states & constants
  const [step, setStep] = useState<number>(1);

  // constants
  const totalSteps = 3;
  const progressBarWidth = 100 / totalSteps;

  // react-hook-form settings
  const {
    register,
    handleSubmit,
    trigger,
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
    },
  });

  const steps: {
    name: string;
    fields: (keyof ProfileFormValues)[];
    content: React.ReactNode;
    title: string;
    subtitle: string;
  }[] = [
    {
      name: "Name",
      fields: ["firstName", "lastName"],
      content: (
        <NameFormEntries
          visible={step === 1}
          register={register}
          errors={errors}
        />
      ),
      title: "Enter your name",
      subtitle: "Please provide your name below.",
    },
    {
      name: "DOB & Gender",
      fields: ["dob", "gender"],
      content: (
        <OptionalFormEntries
          visible={step === 2}
          register={register}
          setValue={setValue}
        />
      ),
      title: "Enter your information",
      subtitle: "Please provide some extra information about you. (Optional)",
    },
    {
      name: "Username",
      fields: ["username"],
      content: (
        <UsernameEntry
          visible={step === 3}
          register={register}
          errors={errors}
        />
      ),
      title: "Enter your username",
      subtitle: "Please set your username.",
    },
  ];

  // hooks
  const logger = useLogger("/src/pages/set-profile.tsx");
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const user = auth.currentUser;
  const navigate = useNavigate();

  // handlers
  const onSubmitHandler = async (data: ProfileFormValues) => {
    logger.debug("Form data:", data);
    logger.debug(user);
    if (user) {
      const fullname = [data.firstName, data.middleName, data.lastName]
        .filter(Boolean)
        .join(" ");

      // firebase
      await updateProfile(user, { displayName: fullname });

      // db
      const payload = {
        name: {
          firstName: data.firstName,
          middleName: data.middleName || null,
          lastName: data.lastName,
        },
        dob: data.dob,
        gender: data.gender || null,
        username: data.username,
      };
      await updateUserProfile(user.uid, payload);

      // redux store
      dispatch(
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        })
      );

      navigate("/");
    }
  };

  const handleNext = async () => {
    const fields = steps[step - 1].fields;
    const valid = await trigger(fields);
    if (valid) setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  };

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Rendered
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      <h1 className="mb-3 text-4xl font-bold text-gray-700">
        Welcome to Upper Room!
      </h1>
      <p className="text-sm text-gray-400">
        Take 30 seconds to complete setting up your profile.
      </p>
      <div className="container mx-auto px-6 py-6 lg:h-[60vh] h-[80vh]">
        <div className="relative flex flex-col w-[90%] h-full mx-auto justify-center items-center">
          <div className="relative flex flex-col items-center gap-7 rounded-xl h-60vh bg-white w-full lg:w-2/3 shadow-xl overflow-auto">
            <div className="flex flex-col items-center gap-7 bg-white w-full h-full overflow-auto pb-24">
              <div className="relative w-full">
                <motion.div
                  initial={false}
                  animate={{ width: `${progressBarWidth * step}%` }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute inset-0 h-2 bg-primary-100/80"
                />
              </div>

              <div className="mb-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {steps[step - 1].title}
                </h2>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  {steps[step - 1].subtitle}
                </p>
              </div>
              <form
                id="profileForm"
                onSubmit={handleSubmit(onSubmitHandler)}
                className="w-full "
              >
                {steps.map((step, index) => (
                  <div key={step.name || index}>{step.content}</div>
                ))}
              </form>
            </div>
            <div className="absolute right-0 bottom-0 my-3 mx-5 space-x-3">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="bg-gray-200 hover:bg-gray-300 transition ease-in-out px-3 py-1 rounded text-gray-800 font-semibold"
                >
                  back
                </button>
              )}
              {step < totalSteps && (
                <button
                  onClick={handleNext}
                  className="bg-gray-200 hover:bg-gray-300 transition ease-in-out px-3 py-1 rounded text-gray-800 font-semibold"
                >
                  {" "}
                  next{" "}
                </button>
              )}
              {step === totalSteps && (
                <button
                  type="submit"
                  form="profileForm"
                  className="bg-primary-100/60 hover:bg-primary-100/80 transition ease-in-out px-3 py-1 rounded text-gray-800 font-semibold"
                >
                  save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NameFormEntries = ({ visible, register, errors }) => {
  const fields = [
    { name: "firstName", required: true },
    { name: "middleName", required: false },
    { name: "lastName", required: true },
  ];

  return (
    <div
      className={`space-y-4 w-full flex flex-col justify-center items-center ${
        visible ? "block" : "sr-only"
      }`}
    >
      {fields.map(({ name, required }) => (
        <div
          key={name}
          className="flex flex-col justify-center gap-1 max-w-[90%] md:w-[70%] w-[90%]"
        >
          <div className="flex md:flex-row flex-col justify-center md:items-center">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 w-32 md:w-1/3"
            >
              {name
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (c) => c.toUpperCase())}
            </label>
            <input
              id={name}
              {...register(name, {
                required: required ? `${name} is required` : false,
              })}
              placeholder={name.replace(/([A-Z])/g, " $1")}
              className="mt-1 block flex-1 rounded-md border border-gray-100 px-3 py-2 shadow-sm  sm:text-sm"
            />
          </div>
          {errors[name] && (
            <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const OptionalFormEntries = ({ visible, register, setValue }) => {
  const [gender, setGender] = useState("");
  console.log(gender);

  const handleGenderChange = (value: string) => {
    setGender(value); // update local state
    setValue("gender", value); // update RHF form state
  };
  return (
    <div
      className={`space-y-4 w-full flex flex-col justify-center items-center ${
        visible ? "block" : "sr-only"
      }`}
    >
      {/* Date of Birth */}
      <div className="flex md:flex-row flex-col justify-center md:items-center max-w-[90%] md:w-[70%] w-[90%]">
        <label
          htmlFor="dob"
          className="block text-sm font-medium text-gray-700 w-32 md:w-1/3"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          {...register("dob")}
          className="mt-1 block flex-1 rounded-md border border-gray-100 px-3 py-2 shadow-sm sm:text-sm"
        />
      </div>

      {/* Gender */}
      <div className="flex md:flex-row flex-col justify-center md:items-center max-w-[90%] md:w-[70%] w-[90%]">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 w-32 md:w-1/3"
        >
          Gender
        </label>
        <input
          id="gender"
          {...register("gender")}
          value={gender}
          className="sr-only"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="mt-1 block flex-1 rounded-md border border-gray-100 px-3 py-2 text-left shadow-sm  sm:text-sm focus:ring-white"
            >
              {gender === "M"
                ? "Male"
                : gender === "F"
                ? "Female"
                : "Select Gender"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-full rounded-md border border-gray-200 bg-white shadow-md"
            align="start"
          >
            <DropdownMenuRadioGroup
              value={gender}
              onValueChange={handleGenderChange}
            >
              <DropdownMenuRadioItem value="M">Male</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="F">Female</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const UsernameEntry = ({ visible, register, errors }) => {
  return (
    <div
      className={`space-y-4 w-full flex flex-col justify-center items-center ${
        visible ? "block" : "sr-only"
      }`}
    >
      {/* Username */}
      <div className="flex md:flex-row flex-col justify-center md:items-center max-w-[90%] md:w-[70%] w-[90%]">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 w-32 md:w-1/3"
        >
          Username
        </label>
        <input
          id="username"
          {...register("username", { required: "Username is required" })}
          placeholder="username"
          className="mt-1 block flex-1 rounded-md border border-gray-100 px-3 py-2 text-left shadow-sm sm:text-sm"
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
        )}
      </div>
    </div>
  );
};
export default SetProfile;
