// navigationLogic.js
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";
import {useAuth} from "../../Auth/AuthProvider.jsx";

export default function useNavigationLogic() {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleNav = (path) => {
    if (isAuthenticated) {
      startTransition(() => {
        navigate(path);
      });
    } else {
      if (typeof openAuthModal === "function") {
        openAuthModal("signin");
      } else {
        console.error("openAuthModal is not a function:", openAuthModal);
      }
    }
  };

  return { handleNav };
}
