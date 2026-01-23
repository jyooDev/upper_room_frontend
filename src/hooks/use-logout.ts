import { useNavigate } from "react-router";
import { signout } from "../firebase/firebase-auth";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};

export default useLogout;
