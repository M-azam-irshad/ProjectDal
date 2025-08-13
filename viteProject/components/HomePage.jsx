import React, { useState, useEffect } from 'react';

import { ChevronDown, Sparkles, Trophy, Users, Zap, Star, ArrowRight, Code, Share2, Eye } from 'lucide-react';

const ProjectDalHomepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredRobot, setHoveredRobot] = useState(null);
  const [stats, setStats] = useState({ projects: 0, engineers: 0, innovations: 0 });

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated counter for stats
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const interval = 50;
      const steps = duration / interval;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          projects: Math.floor(1247 * progress),
          engineers: Math.floor(15680 * progress),
          innovations: Math.floor(892 * progress)
        });

        if (step >= steps) clearInterval(timer);
      }, interval);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const robots = [
    { id: 1, x: 20, y: 15, size: 'small', delay: 0 },
    { id: 2, x: 35, y: 25, size: 'medium', delay: 0.2 },
    { id: 3, x: 50, y: 10, size: 'large', delay: 0.4 },
    { id: 4, x: 65, y: 30, size: 'medium', delay: 0.6 },
    { id: 5, x: 80, y: 20, size: 'small', delay: 0.8 }
  ];

  const features = [
    { icon: Code, title: '3D Previews', description: 'Interactive project visualization' },
    { icon: Share2, title: 'Easy Sharing', description: 'One-click project sharing' },
    { icon: Eye, title: 'Documentation', description: 'Crystal clear docs' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 shadow-lg">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ProjectDal
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Projects', 'Community', 'About'].map((item, index) => (
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
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 animate-bounce">
                <Trophy className="w-4 h-4 mr-2" />
                #1 Engineering Community Platform
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Where Engineers
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                    Share & Inspire
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Showcase your projects with interactive 3D previews, comprehensive documentation, and connect with a thriving community of innovators.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Upload Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="px-8 py-4 bg-white text-gray-700 rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center justify-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Explore Projects
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.projects.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.engineers.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600">Engineers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.innovations.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600">Innovations</div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Robot Animation */}
            <div className="relative">
              {/* Main container */}
              <div className="relative h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl overflow-hidden shadow-2xl">
                {/* Background patterns */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                
                {/* Floating geometric shapes */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 border border-white/20 rounded-lg animate-pulse"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${10 + (i % 3) * 25}%`,
                      transform: `rotate(${i * 45}deg)`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}

                {/* Animated robots */}
                {robots.map((robot) => (
                  <div
                    key={robot.id}
                    className={`absolute transform transition-all duration-500 cursor-pointer ${
                      hoveredRobot === robot.id ? 'scale-110' : 'hover:scale-105'
                    }`}
                    style={{
                      left: `${robot.x}%`,
                      top: `${robot.y}%`,
                      transform: `translate(-50%, -50%) ${hoveredRobot === robot.id ? 'scale(1.1)' : ''}`,
                      animationDelay: `${robot.delay}s`
                    }}
                    onMouseEnter={() => setHoveredRobot(robot.id)}
                    onMouseLeave={() => setHoveredRobot(null)}
                  >
                    <div className={`
                      ${robot.size === 'small' ? 'w-12 h-16' : robot.size === 'medium' ? 'w-16 h-20' : 'w-20 h-24'}
                      bg-gradient-to-b from-gray-200 to-gray-400 rounded-2xl shadow-lg animate-bounce
                      flex flex-col items-center justify-between p-2
                    `}>
                      {/* Robot head */}
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-inner">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                        </div>
                      </div>
                      
                      {/* Robot body */}
                      <div className="flex-1 w-full bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg"></div>
                      
                      {/* Robot arms */}
                      <div className="absolute left-0 top-1/2 w-2 h-4 bg-gray-300 rounded-full transform -translate-x-1 animate-pulse"></div>
                      <div className="absolute right-0 top-1/2 w-2 h-4 bg-gray-300 rounded-full transform translate-x-1 animate-pulse"></div>
                    </div>
                    
                    {/* Floating achievement badge */}
                    {hoveredRobot === robot.id && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-xs font-bold shadow-lg animate-bounce">
                        <Star className="w-3 h-3 inline mr-1" />
                        +10 XP
                      </div>
                    )}
                  </div>
                ))}

                {/* Floating UI elements */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg animate-pulse">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium">Live Collaboration</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg animate-pulse">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium">5 viewers</span>
                  </div>
                </div>
              </div>

              {/* Feature cards */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <feature.icon className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <div className="text-xs font-medium text-gray-700 text-center">{feature.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProjectDalHomepage;