<style>
  {`
  @keyframes neonBorder {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`}
</style>;

import React, { useState, useEffect } from "react";
import FancyButton from "./sub-components/FancyButton";
import {
  ChevronDown,
  Sparkles,
  Trophy,
  Zap,
  ArrowRight,
  Eye,
} from "lucide-react";


const ProjectDalHomepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Background `Video` */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover filter blur-[6px]"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="fallback.jpg"
        >
          <source src="/ProjectDalBgVideoCompressed.webm" type="video/webm" />
          <source src="/ProjectDalBgVideoCompressed.mp4" type="video/mp4" />
        </video>
        {/* Vignette Overlays */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-500 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
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

          {/* Menu */}
          <div className="sm:text-xl md:flex items-center space-x-8 text-xl ">
            {["Home", "Projects", "About"].map((item) => (
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
            <FancyButton children={`Get started`} bgColor="bg-gradient-to-r from-blue-400 to-purple-900" textColor="text-white/90" />
      
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        id="Hero"
        className="relative z-10 flex items-center justify-center min-h-[80vh] text-center px-6"
      >
        <div className="max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 animate-bounce">
            <Trophy className="w-4 h-4 mr-2" />
            Engineering Community Platform
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg font-" style={{fontFamily:"Segoe UI, sans-serif"}}>
            Where Engineers
            <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse" style={{fontFamily:"Segoe UI, sans-serif"}}>
              Share & Inspire
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-100 max-w-xl mx-auto drop-shadow-md">
            Showcase your projects with interactive 3D previews, comprehensive
            documentation, and connect with a thriving community of innovators.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Upload Project Button with Pop-out Images */}
            <div className="relative inline-block group">
              {/* Pop-out images */}
              <img
                src="/ArduinoProject.png"
                alt="preview 1"
                className="pointer-events-none select-none absolute -top-6 left-6 w-10 h-10 rounded-lg shadow-lg opacity-0 translate-y-2 rotate-[-10deg] blur-[0.2px] transition-all duration-300 ease-out transform-gpu group-hover:opacity-100 group-hover:translate-y-[-8px] group-hover:rotate-[-16deg]"
                style={{ transitionDelay: "40ms", zIndex: 0 }}
              />
              <img
                src="/HeroPic.png"
                alt="preview 2"
                className="pointer-events-none select-none absolute -top-10 left-20 w-14 h-14 rounded-xl shadow-lg opacity-0 translate-y-2 rotate-[4deg] transition-all duration-300 ease-out transform-gpu group-hover:opacity-100 group-hover:translate-y-[-14px] translate-x-[10px] group-hover:rotate-[9deg]"
                style={{ transitionDelay: "80ms", zIndex: 0 }}
              />
              <img
                src="/BotProject.png"
                alt="preview 3"
                className="pointer-events-none select-none absolute -top-4 left-40 w-9 h-9 rounded-md shadow-lg opacity-0 translate-y-2 rotate-[-4deg] transition-all duration-300 ease-out transform-gpu group-hover:opacity-100 group-hover:translate-y-[-20px] group-hover:rotate-[-10deg]"
                style={{ transitionDelay: "120ms", zIndex: 0 }}
              />

              {/* Button */}
              <button className="relative z-10 group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-800 text-white rounded-2xl font-semibold flex items-center justify-center  cursor-pointer shadow-md hover:shadow-xl transform-gpu transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden">
                {/* Animated border */}
                <span
                  className="absolute inset-0 rounded-2xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0)",
                    backgroundSize: "200% 200%",
                    animation: "borderGlow 2s linear infinite",
                  }}
                >
                  <span className="block w-full h-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-800"></span>
                </span>
                <Zap className="w-5 h-5 group-hover:animate-spin" />
                <div className="flex-1 z-100">Upload Project</div>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Explore Projects Button */}
            <button className="px-8 py-4 bg-white/90 text-gray-800 rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 transition-all font-semibold flex items-center justify-center cursor-pointer shadow-md">
              <Eye className="w-5 h-5 mr-2" />
              Explore Projects
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-6 h-6 text-white/80" />
      </div>
    </div>
  );
};

export default ProjectDalHomepage;
