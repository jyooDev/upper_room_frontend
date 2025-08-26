import { signOut } from "firebase/auth";
import { auth } from "../main";
import { useNavigate } from "react-router";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};

export default useLogout;
