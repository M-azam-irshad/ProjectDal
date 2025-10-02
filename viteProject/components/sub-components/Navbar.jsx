import { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import FancyButton from "./FancyButton";
import { useAuth } from "../../Auth/AuthProvider"; // Make sure this path is correct
import {
  ChevronDown,
  Sparkles,
  Trophy,
  Zap,
  ArrowRight,
  Eye,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

function Navbar() {
  // Add debugging to see what useAuth returns
  const [getStarted, setGetStarted] = useState(false);
  const authData = useAuth();
  console.log("Auth data:", authData); // Debug line

  const { isAuthenticated, openAuthModal, signOut, user } = authData;
  const navigate = useNavigate(); // Add this

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/allprojects" },
    { name: "About", path: "/about" },
    {name: "My Projects", path:"/myprojects"}
  ];

  // Add safety check for openAuthModal
  const handleAuthModal = (mode) => {
    console.log("openAuthModal:", openAuthModal); // Debug line
    if (typeof openAuthModal === "function") {
      openAuthModal(mode);
    } else {
      console.error("openAuthModal is not a function:", openAuthModal);
    }
  };

  const handleNav = (path) => {
  startTransition(() => {
    navigate(path);
  });
};
  // Add this function to handle Get Started click
  const handleGetStartedClick = (e) => {
    e.preventDefault(); // Prevent default navigation

    if (isAuthenticated) {
      setGetStarted(true);
      handleNav("/projectUploader"); // Navigate to uploader if signed in
    } else {
      handleAuthModal("signin"); // Open auth modal if not signed in
    }
  };

  // Logo Component (reused in both layouts)
  const Logo = (size) => (
    <div className="flex items-center space-x-3 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={`MainLogoDesktop.png`} alt="" />
      <h1 className="text-2xl font-bold bg-white bg-clip-text text-transparent ">
        ProjectLaga
      </h1>
    </div>
  );

  return (
    <nav className="relative z-50  bg-gradient-to-r from-blue-500 to-blue-500 backdrop-blur-md">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Menu */}
          <div className="flex items-center space-x-8 text-xl">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative text-white hover:text-purple-900 font-medium group transition-transform duration-300 ease-in-out hover:scale-[1.2]"
              >
                {item.name}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-black/50 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
          
                <button
                  onClick={signOut}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={() => handleAuthModal("signup")}
                  className={`
        px-6 py-3 
        rounded-[26px] 
        text-black font-semibold 
        shadow-[35px_35px_68px_0px_rgba(62,139,248,0.5),inset_-9px_-9px_6px_0px_rgba(62,139,248,0.6),inset_0px_11px_18px_0px_rgb(255,255,255)]
        bg-white
        backdrop-blur-[0px]
        transition-transform duration-200
        hover:scale-105 active:scale-95
        cursor-pointer
      `}
                >
                  Sign Up
                </button>
              </div>
            )}
            
          
              <button
                onClick={handleGetStartedClick}
                className={`
        px-6 py-3 
        rounded-[26px] 
        text-white font-semibold 
        shadow-[35px_35px_68px_0px_rgba(62,139,248,0.5),inset_-9px_-9px_6px_0px_rgba(62,139,248,0.6),inset_0px_11px_18px_0px_rgb(255,255,255)]
        bg-gradient-to-r from-blue-400 to-purple-900
        backdrop-blur-[0px]
        transition-transform duration-200
        hover:scale-105 active:scale-95
        cursor-pointer
      `}
              >
                Get started
              </button>
            
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-white" />
            ) : (
              <Menu size={20} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gradient-to-br from-blue-600 to-blue-700 backdrop-blur-lg border-t border-white/20 shadow-2xl">
            <div className="px-6 py-6 space-y-6">
              {/* Mobile Navigation */}
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-white hover:text-purple-200 font-medium text-lg transition-colors duration-300 py-2 border-b border-white/10 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/20">
                {isAuthenticated ? (
                  <>
                    <span className="block text-sm text-gray-200">
                      Hello, {user?.email}
                    </span>
                    <button
                      onClick={signOut}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-full">
                      <button
                        children={`Sign up`}
                        onClick={() => handleAuthModal("signup")}
                        className={`
                          px-6 py-3 
                          rounded-[26px] 
                          text-black font-semibold 
                          shadow-[35px_35px_68px_0px_rgba(62,139,248,0.5),inset_-9px_-9px_6px_0px_rgba(62,139,248,0.6),inset_0px_11px_18px_0px_rgb(255,255,255)]
                          bg-white
                          backdrop-blur-[0px]
                          transition-transform duration-200
                          hover:scale-105 active:scale-95
                          cursor-pointer
                        `}
                      >
                        Sign up
                      </button>
                    </div>
                  </>
                )}
                
                {/* Mobile Get Started Button */}
                {(!isAuthenticated || !getStarted) && (
                  <div className="w-full">
                    <button
                      onClick={handleGetStartedClick}
                      className={`
                        w-full px-6 py-3 
                        rounded-[26px] 
                        text-white font-semibold 
                        shadow-[35px_35px_68px_0px_rgba(62,139,248,0.5),inset_-9px_-9px_6px_0px_rgba(62,139,248,0.6),inset_0px_11px_18px_0px_rgb(255,255,255)]
                        bg-gradient-to-r from-blue-400 to-purple-900
                        backdrop-blur-[0px]
                        transition-transform duration-200
                        hover:scale-105 active:scale-95
                        cursor-pointer
                      `}
                    >
                      Get started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;