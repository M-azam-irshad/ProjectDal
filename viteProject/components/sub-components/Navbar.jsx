import { useState } from "react";
import FancyButton from "./FancyButton";
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




function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = ["Home", "Projects", "About"];

  // Logo Component (reused in both layouts)
  const Logo = () => (
    <div className="flex items-center space-x-3 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl flex items-center justify-center rotate-3 shadow-lg">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <Sparkles className="w-2 h-2 text-white" />
        </div>
      </div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-900 bg-clip-text text-transparent">
        ProjectDal
      </h1>
    </div>
  );

  return (
    <nav className="relative z-50 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-500 backdrop-blur-md">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Menu */}
          <div className="flex items-center space-x-8 text-xl">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="relative text-white hover:text-purple-900 font-medium group transition-transform duration-300 ease-in-out hover:scale-[1.2]"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-black/50 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <FancyButton children={`Sign in`} />
            <FancyButton 
              children={`Get started`} 
              bgColor="bg-gradient-to-r from-blue-400 to-purple-900" 
              textColor="text-white/90" 
            />
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
                  <a
                    key={item}
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-white hover:text-purple-200 font-medium text-lg transition-colors duration-300 py-2 border-b border-white/10 last:border-b-0"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Mobile Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/20">
                <div className="w-full">
                  <FancyButton children={`Sign in`} />
                </div>
                <div className="w-full">
                  <FancyButton 
                    children={`Get started`} 
                    bgColor="bg-gradient-to-r from-blue-400 to-purple-900" 
                    textColor="text-white/90" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;