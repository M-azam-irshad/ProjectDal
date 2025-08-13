import React, { useState, useEffect } from "react";

import {
  ChevronDown,
  Sparkles,
  Trophy,
  Users,
  Zap,
  Star,
  ArrowRight,
  Code,
  Share2,
  Eye,
  Wrench
} from "lucide-react";

const ProjectDalHomepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredRobot, setHoveredRobot] = useState(null);
  const [stats, setStats] = useState({
    projects: 0,
    engineers: 0,
    innovations: 0,
  });

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated counter for stats

  const robots = [
    { id: 1, x: 20, y: 15, size: "small", delay: 0 },
    { id: 2, x: 35, y: 25, size: "medium", delay: 0.2 },
    { id: 3, x: 50, y: 10, size: "large", delay: 0.4 },
    { id: 4, x: 65, y: 30, size: "medium", delay: 0.6 },
    { id: 5, x: 80, y: 20, size: "small", delay: 0.8 },
  ];

  const features = [
    {
      icon: Code,
      title: "3D Previews",
      description: "Interactive project visualization",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "One-click project sharing",
    },
    { icon: Eye, title: "Documentation", description: "Crystal clear docs" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated background elements */}
  

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 bg-white/80 ">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl flex items-center justify-center transform rotate-3 shadow-lg">
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

          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Projects", "About"].map((item, index) => (
              <a
                key={item}
                href="#"
                className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium  cursor-pointer hover:scale-110 transition-transform">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-900 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
  <div
  id="Hero"
  className="relative flex items-center justify-center min-h-[80vh] "
>
  {/* Background Image */}
  <div className="absolute inset-0 overflow-hidden">
    <img
      src="../public/HeroPic.png"
      alt="Robots dancing Image"
      className="w-full h-full object-cover blur-xs opacity-70"
    />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl text-center space-y-8 px-6">
    {/* Badge */}
    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 animate-bounce">
      <Trophy className="w-4 h-4 mr-2" />
      Engineering Community Platform
    </div>

    {/* Main Heading */}
    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
      Where Engineers
      <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
        Share & Inspire
      </span>
    </h1>

    <p className="text-xl text-gray-900 leading-relaxed max-w-xl mx-auto">
      Showcase your projects with interactive 3D previews,
      comprehensive documentation, and connect with a thriving
      community of innovators.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-800 text-white rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center justify-center">
        <Zap className="w-5 h-5 mr-2 group-hover:animate-spin" />
        Upload Project
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>

      <button className="px-8 py-4 bg-white text-gray-700 rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center justify-center">
        <Eye className="w-5 h-5 mr-2" />
        Explore Projects
      </button>
    </div>
  </div>
</div>
              {/* Stats */}
       
            {/* Right Content - Enhanced Robot Animation */}

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
        </div>
      );
    };

export default ProjectDalHomepage;
